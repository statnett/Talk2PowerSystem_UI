import {DiagramModel} from './diagram';

export class SvgDiagramModel extends DiagramModel {
  constructor(data = {}) {
    super(data);
    this.svg = data.svg;
    this.url = data.url;
    this.hash = this.generateHash();
  }
}
