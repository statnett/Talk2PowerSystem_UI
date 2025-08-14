import './open-in-sparql-editor.directive.scss';
import template from './open-in-sparql-editor.directive.html';

/**
 * @ngdoc directive
 * @name tt2ps.core.directives.open-in-sparql-editor:openInSparqlEditor
 * @restrict E
 *
 * @description
 * This directive provides a button that allows users to open the SPARQL editor with a pre-defined query.
 * Optionally, it can handle repository switching before opening the editor and executing the query.
 * The directive can also trigger the query execution automatically if specified.
 *
 * @scope
 *
 * @param {string} query The SPARQL query to be opened and optionally executed in the SPARQL editor.
 * @param {string} repositoryId The ID of the repository to be selected before opening the SPARQL editor.
 * @param {string} executeQuery Flag that determines whether the query should be executed upon opening the editor.
 *                              It accepts 'true' or 'false'. If 'true', the query will be automatically executed.
 *
 * @example
 * <open-in-sparql-editor
 *     query="SELECT * WHERE {?s ?p ?o}"
 *     repository-id="myRepository"
 *     execute-query="true">
 * </open-in-sparql-editor>
 *
 * @param {string} query The SPARQL query to be executed in the new tab.
 */

const OpenInSparqlEditorModule = angular
    .module('tt2ps.core.directives.open-in-sparql-editor', []);
OpenInSparqlEditorModule
    .directive('openInSparqlEditor', OpenInSparqlEditorDirective);

OpenInSparqlEditorDirective.$inject = [];

function OpenInSparqlEditorDirective() {
    return {
        template,
        restrict: 'E',
        scope: {
            query: '@',
            executeQuery: '@'
        },
        link: function($scope) {
            if (!$scope.executeQuery) {
                $scope.executeQuery = false;
            }
        }
    };
}

export default OpenInSparqlEditorModule;
