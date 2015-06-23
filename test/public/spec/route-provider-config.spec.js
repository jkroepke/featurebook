'use strict';

describe('featurebook', function () {

    var $rootScope, $route, $location, featureBookService;

    beforeEach(function () {
        module('scFeatureBook');
        module('scFeatureBook.templates');
        inject(function (_$rootScope_, _$route_, _$location_, _featureBookService_) {
            $rootScope = _$rootScope_;
            $route = _$route_;
            $location = _$location_;
            featureBookService = _featureBookService_;
        });
    });

    it('should configure route for `/home`', function () {
        expect($route.current).toBeUndefined();
        spyOn(featureBookService, 'summary').and.returnValue('<div>summary</div>');

        $location.path('/home');
        $rootScope.$digest();

        expect($route.current.templateUrl).toBe('views/home.html');
        expect($route.current.controller).toBe('HomeController');
    });

    it('should configure route for `/viewer/my.feature`', function () {
        spyOn(featureBookService, 'getModelByPath').and.returnValue({name: 'Test feature'});
        $location.path('/viewer/my.feature');
        $rootScope.$digest();

        expect($route.current.templateUrl).toBe('views/feature-viewer.html');
        expect($route.current.pathParams.path).toEqual('my.feature');
        expect($route.current.controller).toBe('FeatureViewerController');
        expect($route.current.locals.feature).toEqual({name: 'Test feature'});
    });

    it('should configure route for `/viewer/a/sub/folder/for/my.feature`', function () {
        spyOn(featureBookService, 'getModelByPath').and.returnValue({name: 'Test feature'});
        $location.path('/viewer/a/sub/folder/for/my.feature');
        $rootScope.$digest();

        expect($route.current.templateUrl).toBe('views/feature-viewer.html');
        expect($route.current.pathParams.path).toEqual('a/sub/folder/for/my.feature');
        expect($route.current.controller).toBe('FeatureViewerController');
        expect($route.current.locals.feature).toEqual({name: 'Test feature'});
    });

    it('should redirect to `/home` otherwise', function () {
        spyOn(featureBookService, 'summary').and.returnValue('<div>summary</div>div>');
        $location.path('/somewhere');
        $rootScope.$digest();

        expect($route.current.templateUrl).toBe('views/home.html');
        expect($route.current.controller).toBe('HomeController');
    });

});