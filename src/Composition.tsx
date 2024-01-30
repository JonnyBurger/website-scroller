import React from 'react';
import {
	AbsoluteFill,
	CalculateMetadataFunction,
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import * as z from 'zod';

export const schema = z.object({
	url: z.string(),
	duration: z.number(),
});

type Schema = z.infer<typeof schema>;
type Dimensions = {
	width: number | null;
	height: number | null;
};

export const calculateMetadata: CalculateMetadataFunction<
	Schema & Dimensions
> = async ({props}) => {
	const parsed = schema.parse(props);
	const img = document.createElement('img');
	img.src = parsed.url;

	const dimensions = await new Promise<Dimensions>((resolve, reject) => {
		img.onload = () => {
			resolve({
				width: img.width,
				height: img.height,
			});
		};
		img.onerror = reject;
	});

	return {
		props: {
			url: parsed.url,
			width: dimensions.width,
			height: dimensions.height,
			duration: parsed.duration,
		},
		durationInFrames: (parsed.duration + 1) * 30,
		fps: 30,
	};
};

export const MyComposition: React.FC<Dimensions & Schema> = ({
	url,
	width,
	height,
	duration,
}) => {
	if (width === null || height === null) {
		throw new Error('Width or height is null');
	}
	const frame = useCurrentFrame();
	const {
		width: compositionWidth,
		height: compositionHeight,
		fps,
	} = useVideoConfig();

	const aspectRatio = height / width;
	const imageHeight = compositionWidth * aspectRatio;

	const startOffset = -imageHeight + compositionHeight;

	const progress = spring({
		frame,
		fps,
		config: {
			damping: 46,
		},
		durationInFrames: duration * fps,
		durationRestThreshold: 0.0001,
	});

	const marginTop = interpolate(progress, [0, 1], [startOffset, 0]);

	return (
		<AbsoluteFill>
			<Img
				style={{
					width: compositionWidth,
					height: imageHeight,
					marginTop,
				}}
				src={url}
			/>
		</AbsoluteFill>
	);
};
