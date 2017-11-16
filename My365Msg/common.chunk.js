webpackJsonp(["common"],{

/***/ "../../../../../src/app/authantication/authantication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthanticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/finally';
var AuthanticationService = (function () {
    function AuthanticationService(db, afAuth, router) {
        this.db = db;
        this.afAuth = afAuth;
        this.router = router;
        this.basePath = '/users';
        this.users = null; //  list of objects
        this.user = null; //   single object
    }
    AuthanticationService.prototype.isAuthanticated = function () {
        localStorage.getItem('email');
    };
    AuthanticationService.prototype.signup = function (senderName, username, email, password, receiverName, PassCode, startDate) {
        var _this = this;
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(function (response) {
            _this.db.list('/users').push({
                'senderName': senderName,
                'username': username,
                'email': email,
                'receiverName': receiverName,
                'PassCode': PassCode,
                'startDate': startDate,
                'messages': [
                    { 'content': 'message 0 text', 'viewDate': Date.now() },
                    { 'content': 'message 1 text', 'viewDate': Date.now() },
                    { 'content': 'message 2 text', 'viewDate': 0 }
                ]
            });
            // console.log(response);
            _this.login(email, password);
        })
            .catch(function (error) { return console.log(error); });
    };
    AuthanticationService.prototype.login = function (email, password) {
        var _this = this;
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function (response) {
            _this.afAuth.auth.currentUser.getToken()
                .then(function (token) {
                // this.getusers(email);
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                _this.router.navigate(['messages']);
            });
        })
            .catch(function (error) {
            alert('there is a problem !: ' + error.message);
            console.log(error);
        });
    };
    AuthanticationService.prototype.logout = function () {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
        localStorage.clear();
    };
    AuthanticationService.prototype.PassCodeChker = function (passCode) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (passCode) {
                _this.db.list('/users', function (ref) { return ref.orderByChild('PassCode').equalTo(passCode); }).valueChanges()
                    .subscribe(function (response) {
                    if (response.length !== 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            }
            else {
                reject();
            }
        });
        return promise;
    };
    AuthanticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]])
    ], AuthanticationService);
    return AuthanticationService;
}());



/***/ })

});
//# sourceMappingURL=common.chunk.js.map