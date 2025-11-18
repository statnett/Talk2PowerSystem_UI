import {GeneratorUtils} from '../../../services/utils/generator-utils';

export class DiagramModel {
  constructor(data = {}) {
    this.hashGenerator = GeneratorUtils.hashCode;
    this.type = data.type;
    this.hash = undefined
  }
  generateHash() {
    return this.hashGenerator(JSON.stringify(this));
  }
}
