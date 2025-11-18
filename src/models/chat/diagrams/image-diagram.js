import {DiagramModel} from './diagram';

export class ImageDiagramModel extends DiagramModel{
  constructor(data = {}) {
    super(data);
    this.url = data.url;
    this.hash = this.generateHash();
  }
}
