import {Composition} from 'remotion';
import {calculateMetadata, MyComposition, schema} from './Composition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				width={1920}
				height={1080}
				schema={schema}
				calculateMetadata={calculateMetadata}
				defaultProps={{
					url: 'https://transfer.sh/xwlRqA1qxi/ping.jpg',
					width: null,
					height: null,
					duration: 5,
				}}
			/>
		</>
	);
};
