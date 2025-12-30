declare module 'pptx-parser' {
  interface PPTXParserResult {
    slides: Array<{
      text?: string;
    }>;
  }

  interface PPTXParserModule {
    default: (buffer: Buffer) => Promise<PPTXParserResult>;
  }

  const pptxParser: PPTXParserModule;
  export = pptxParser;
}
