(
    function()
    {
        "use strict";

        angular.module('randomApp').controller('RandomController', ['$scope', '$http', function($scope, $http)
        {
            $scope.getWord = function()
            {
                // load word via json eg {word: 'fish'}

                $http.get('/word').then(function(result)
                {
                    $scope.text = result.data.word;
                });
            };

            // init

            $scope.getWord();

        }]);

    }()
);
