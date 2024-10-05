import { invokeDenoNodeJSTransformer } from "DNT";
await invokeDenoNodeJSTransformer({
	assetsCopy: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: [{
		name: ".",
		path: "mod.ts"
	}],
	generateDeclarationMap: true,
	metadata: {
		name: "@hugoalh/range-iterator",
		version: "2.0.4",
		description: "A module to iterate between range.",
		keywords: [
			"range",
			"iterate",
			"iterator"
		],
		homepage: "https://github.com/hugoalh-studio/range-iterator-es#readme",
		bugs: {
			url: "https://github.com/hugoalh-studio/range-iterator-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh-studio/range-iterator-es.git"
		},
		scripts: {
		},
		engines: {
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});
