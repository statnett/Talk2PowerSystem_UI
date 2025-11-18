import {DiagramModel} from './diagram';

export class SvgDiagramModel extends DiagramModel {
  constructor(data = {}) {
    super(data);
    this.svg = data.svg;
    this.hash = this.generateHash();
  }
}
