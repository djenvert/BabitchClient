'use strict';

describe('Controller: BabitchStatsTeamsCtrl', function() {

    // load the controller's module
    beforeEach(module('babitchFrontendApp'));
    var theBabitchStatsTeamsCtrl,
        scope,
        httpMock,
        config;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $httpBackend, CONFIG) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        config = CONFIG;

        httpMock.whenGET(config.BABITCH_WS_URL + "/players").respond(Fixtures.players);
        httpMock.whenGET(config.BABITCH_WS_URL + "/games?per_page=100").respond(Fixtures.games);

        theBabitchStatsTeamsCtrl = $controller('babitchStatsTeamsCtrl', {
            $scope: scope
        });

        //Flush the .query
        httpMock.flush();

    }));

    afterEach(function() {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

    it('should load all players', function() {
        expect(scope.stats.playersList.length).toBe(22);
    });

    it('should load all games', function() {
        expect(scope.stats.gamesList.length).toBe(3);
    });

    it('should generate stats for all players', function() {
        expect(scope.stats.statsPlayers.length).toBe(22);
    });

    it('should generate stats for all teams', function() {
        expect(scope.stats.statsTeams.length).toBe(5); //5 different teams
    });

});

