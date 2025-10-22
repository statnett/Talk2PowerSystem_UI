import ComponentsRestServiceModule from './components.rest.service';
import {toComponentInfoMapper} from './mappers/components-info.mapper';
import projectInfo from '../../configurations/project-info';
import {DependencyModel} from '../../models/components/dependency';
import {FrontendModel} from '../../models/components/frontend';

const modules = [
  ComponentsRestServiceModule.name
];

const ComponentsServiceModule = angular.module('tt2ps.services.component.components-service', modules);
ComponentsServiceModule.factory('ComponentsService', ComponentsService);

ComponentsService.$inject = ['ComponentRestService'];

function ComponentsService(ComponentRestService) {
  /**
   * Gets information about components used from application.
   *
   * @return {Promise<ComponentsInfoModel>}
   */
  const getComponentInfo = () => {
    return ComponentRestService.getComponentInfo()
      .then((response) => toComponentInfoMapper(response.data))
      .then(addUIPackagesInfo);
  }

  const addUIPackagesInfo = (componentsInfo) => {
    componentsInfo.frontend = new FrontendModel({
      project: new DependencyModel(projectInfo.project),
      framework: new DependencyModel(projectInfo.framework),
      runtime: new DependencyModel(projectInfo.runtime),
      dependencies: projectInfo.dependencies.map(dependency => new DependencyModel(dependency))
    })
    return componentsInfo;
  }

  return {
    getComponentInfo,
  };
}

export default ComponentsServiceModule;
