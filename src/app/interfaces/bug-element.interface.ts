export class BugElement {
    label: string;
    dataLabel: string;
    xPath: string;
    outline: string;
    constructor(label: string, xPath: string, dataLabel: string, outline: string){
      this.label = label;
      this.dataLabel = dataLabel;
      this.xPath = xPath;
      this.outline = outline
    }
}