webpackJsonp([1,4],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_account_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountManagementComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountManagementComponent = (function () {
    function AccountManagementComponent(formBuilder, accountService, router) {
        this.formBuilder = formBuilder;
        this.accountService = accountService;
        this.router = router;
        this.account = { accountCode: "", accountName: "", accountType: "" };
        this.showContextMenu = false;
        this.showCreateAccount = false;
        this.mouseLocation = { 'left': 0, 'top': 0 };
        this.processingInProgress = false;
        this.processingModifyInProgress = false;
        this.processingCreateInProgress = false;
        this.showAccountModifyPage = false;
        this.showInformationMessageBox = false;
        this.informationMessage = "";
        this.confirmationMessage = "";
        this.showConfirmationMessageBox = false;
    }
    AccountManagementComponent.prototype.ngOnInit = function () {
        this.loadData();
        this.formGroupModify = this.formBuilder.group({
            accountCode: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]],
            accountName: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]],
            accountType: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]]
        });
        this.formGroupCreate = this.formBuilder.group({
            accountCode: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]],
            accountName: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]],
            accountType: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]]
        });
    };
    AccountManagementComponent.prototype.loadData = function () {
        var _this = this;
        this.processingInProgress = true;
        this.accountService.getAccounts()
            .subscribe(function (res) {
            _this.accounts = res;
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    AccountManagementComponent.prototype.getContextMenuCss = function () {
        return {
            'position': 'fixed',
            'display': this.showContextMenu ? 'block' : 'none',
            'left': this.mouseLocation.left + 'px',
            'top': this.mouseLocation.top + 'px'
        };
    };
    AccountManagementComponent.prototype.isProcessingInProgress = function () {
        return false;
    };
    AccountManagementComponent.prototype.getShowCreateAccount = function () {
        return this.showCreateAccount;
    };
    AccountManagementComponent.prototype.onCancelCreateAccount = function () {
        this.showCreateAccount = false;
        this.showAccountModifyPage = false;
    };
    AccountManagementComponent.prototype.showCreateAccountDialog = function () {
        this.showCreateAccount = true;
    };
    AccountManagementComponent.prototype.onRightClick = function (event, accountCode, accountName, accountType) {
        this.showContextMenu = true;
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        event.stopPropagation();
        this.account.accountCode = accountCode;
        this.account.accountName = accountName;
        this.account.accountType = accountType;
        this.formGroupModify.get("accountCode").setValue(accountCode);
        this.formGroupModify.get("accountName").setValue(accountName);
        this.formGroupModify.get("accountType").setValue(accountType);
        return false;
    };
    AccountManagementComponent.prototype.onClick = function (event) {
        this.showContextMenu = false;
    };
    AccountManagementComponent.prototype.onModifyClick = function () {
        this.showAccountModifyPage = true;
    };
    AccountManagementComponent.prototype.getShowModifyAccount = function () {
        return this.showAccountModifyPage;
    };
    AccountManagementComponent.prototype.filterAccount = function () {
        var filterAccountCode = "", filterAccountName = "", filterAccountType = "", row, cellAccountCode, cellAccountName, cellAccountType, i;
        filterAccountCode = this.accountCodeInput.nativeElement.value ? this.accountCodeInput.nativeElement.value.toUpperCase() : "";
        filterAccountName = this.accountNameInput.nativeElement.value ? this.accountNameInput.nativeElement.value.toUpperCase() : "";
        filterAccountType = this.accountTypeInput.nativeElement.options[this.accountTypeInput.nativeElement.selectedIndex].text ? this.accountTypeInput.nativeElement.options[this.accountTypeInput.nativeElement.selectedIndex].text.toUpperCase() : "";
        row = this.table.nativeElement.getElementsByClassName("row");
        for (i = 0; i < row.length; i++) {
            if (i > 0) {
                cellAccountCode = row[i].getElementsByClassName("cell")[0];
                cellAccountName = row[i].getElementsByClassName("cell")[1];
                cellAccountType = row[i].getElementsByClassName("cell")[2];
                if (cellAccountCode.innerHTML.toUpperCase().indexOf(filterAccountCode) > -1
                    && cellAccountName.innerHTML.toUpperCase().indexOf(filterAccountName) > -1
                    && ((cellAccountType.innerHTML.toUpperCase().indexOf(filterAccountType) > -1) ||
                        (filterAccountType === "- SELECT -"))) {
                    row[i].style.display = "";
                }
                else {
                    row[i].style.display = "none";
                }
            }
        }
    };
    AccountManagementComponent.prototype.modify = function () {
        var _this = this;
        this.processingModifyInProgress = true;
        this.accountService.modifyAccount(this.formGroupModify.value.accountCode, this.formGroupModify.value)
            .subscribe(function (res) {
        }, function (err) {
            _this.showInformationMessageBox = true;
            _this.informationMessage = "An error occured while modifying the GL Account " + _this.formGroupModify.value.accountCode + " . Please try after sometime.";
            _this.processingModifyInProgress = false;
            _this.showAccountModifyPage = false;
        }, function () {
            _this.showInformationMessageBox = true;
            _this.informationMessage = "The GL Account " + _this.formGroupModify.value.accountCode + " is successfully modified.";
            _this.processingModifyInProgress = false;
            _this.showAccountModifyPage = false;
        });
    };
    AccountManagementComponent.prototype.create = function () {
        var _this = this;
        this.processingCreateInProgress = true;
        this.accountService.createAccount(this.formGroupCreate.value)
            .subscribe(function (res) {
        }, function (err) {
            _this.showInformationMessageBox = true;
            _this.informationMessage = "An error occured while creating the GL Account " + _this.formGroupCreate.value.accountCode + " . Please try after sometime.";
            _this.processingCreateInProgress = false;
            _this.showCreateAccount = false;
        }, function () {
            _this.showInformationMessageBox = true;
            _this.informationMessage = "The GL Account " + _this.formGroupCreate.value.accountCode + " is successfully created.";
            _this.processingCreateInProgress = false;
            _this.showCreateAccount = false;
        });
    };
    AccountManagementComponent.prototype.getShowInformationMessageBox = function () {
        return this.showInformationMessageBox;
    };
    AccountManagementComponent.prototype.OnClickMessageBoxOk = function () {
        this.showInformationMessageBox = false;
        this.informationMessage = "";
        this.loadData();
        this.accountCodeInput.nativeElement.value = "";
        this.accountNameInput.nativeElement.value = "";
        this.accountTypeInput.nativeElement.selectedIndex = 0;
    };
    AccountManagementComponent.prototype.OnClickConfirmationBoxYes = function () {
        var _this = this;
        this.showConfirmationMessageBox = false;
        this.processingInProgress = true;
        this.accountService.deleteAccount(this.account.accountCode)
            .subscribe(function (res) {
        }, function (err) {
            _this.processingInProgress = false;
            _this.showInformationMessageBox = true;
            _this.informationMessage = "An error occured while deleting the GL Account " + _this.account.accountCode + " . Please try after sometime.";
        }, function () {
            _this.processingInProgress = false;
            _this.showInformationMessageBox = true;
            _this.informationMessage = "The GL Account " + _this.account.accountCode + " is successfully deleted.";
        });
    };
    AccountManagementComponent.prototype.OnClickConfirmationBoxNo = function () {
        this.showConfirmationMessageBox = false;
    };
    AccountManagementComponent.prototype.getShowConfirmationMessageBox = function () {
        return this.showConfirmationMessageBox;
    };
    AccountManagementComponent.prototype.onDeleteClick = function () {
        this.showConfirmationMessageBox = true;
        this.confirmationMessage = "Are you sure you want to delete the GL Account " + this.account.accountCode;
    };
    return AccountManagementComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])("accountCode"),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], AccountManagementComponent.prototype, "accountCodeInput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])("accountName"),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _b || Object)
], AccountManagementComponent.prototype, "accountNameInput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])("accountType"),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _c || Object)
], AccountManagementComponent.prototype, "accountTypeInput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])("table"),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _d || Object)
], AccountManagementComponent.prototype, "table", void 0);
AccountManagementComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-account-management',
        template: __webpack_require__(472),
        styles: [__webpack_require__(456)],
        host: {
            '(document:click)': 'onClick($event)',
        }
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_account_service__["a" /* AccountService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _g || Object])
], AccountManagementComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=account-management.component.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_department_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_organization_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_unit_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_country_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_employee_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_district_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_state_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_job_role_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeCreationNewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var EmployeeCreationNewComponent = (function () {
    function EmployeeCreationNewComponent(formBuilder, organizationService, unitService, departmentService, docTypeService, countryService, employeeService, districtService, stateService, jobRoleService) {
        this.formBuilder = formBuilder;
        this.organizationService = organizationService;
        this.unitService = unitService;
        this.departmentService = departmentService;
        this.docTypeService = docTypeService;
        this.countryService = countryService;
        this.employeeService = employeeService;
        this.districtService = districtService;
        this.stateService = stateService;
        this.jobRoleService = jobRoleService;
        this.processingInProgress = false;
        this.message = '';
        this.autoCompleteSuggestions = {
            supervisorEmailIdSuggestions: Array(), hrEmailIdSuggestions: Array()
        };
        this.valueChanged = true;
    }
    EmployeeCreationNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeInfo = this.formBuilder.group({
            'employeeBasicInfo': this.initBasicInfoControls(),
            'employeeAddress': this.formBuilder.group({
                'permanent': this.initAddressGroup('permanent'),
                'present': this.initAddressGroup('present')
            }),
            'employeeAddlDetails': this.initAdditionalInfoControls(),
            'employeeJobRoleDetails': this.formBuilder.group({
                'jobRoleId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'otherDetails': this.otherDetailsControls(),
            'employeeProfile': this.formBuilder.group({
                'qualification': [''],
                'description': [''],
                'comments': ['']
            })
        });
        this.initiateLists();
        this.employeeInfo.controls.otherDetails.get("hrEmailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('hrEmailId', emailId)
                .subscribe(function (data) {
                console.log(data);
                _this.autoCompleteSuggestions.hrEmailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.hrEmailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.employeeInfo.controls.otherDetails.get("supervisorEmailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('supervisorEmailId', emailId)
                .subscribe(function (data) {
                console.log(data);
                _this.autoCompleteSuggestions.supervisorEmailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.supervisorEmailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
    };
    EmployeeCreationNewComponent.prototype.otherDetailsControls = function () {
        return this.formBuilder.group({
            'hrEmailId': [''],
            'supervisorEmailId': [''],
            'cl': [''],
            'maternityLeave': [],
            'paternityLeave': [],
            'pl': [],
            'specialLeave': [],
            'sickLeave': [],
            'probationPeriodEndDate': ['']
        });
    };
    EmployeeCreationNewComponent.prototype.initAdditionalInfoControls = function () {
        return this.formBuilder.group({
            'dependentNo': [''],
            'siblingNo': [''],
            'emergencyContactName': [''],
            'emergencyContactNo': [''],
            'medicalReportComment': [''],
            'preMedicalCheckUpDate': [''],
            'nomineeName1': [''],
            'nomineeShare1': [''],
            'nomineeName2': [''],
            'nomineeShare2': [''],
            'nomineeName3': [''],
            'nomineeShare3': ['']
        });
    };
    EmployeeCreationNewComponent.prototype.initBasicInfoControls = function () {
        return this.formBuilder.group({
            'title': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'empFirstName': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'empMiddleName': [''],
            'empLastName': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'fatherName': [''],
            'dob': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].properDate])],
            'emailId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validEmail])],
            'contactNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validPhone])],
            'nationality': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'doj': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].properDate])],
            'organization': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'department': this.formBuilder.group({
                'departmentId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'unit': this.formBuilder.group({
                'unitId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'empType': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'sex': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'maritalStatus': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'identityDocType': this.formBuilder.group({
                'docTypeId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'identityNumber': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'hrFlag': [''],
            'supervisorFlag': ['']
        });
    };
    /**
     * Create form builder group for address
     */
    EmployeeCreationNewComponent.prototype.initAddressGroup = function (type) {
        return this.formBuilder.group({
            'houseNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'streetName': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'region': [''],
            'area': [''],
            'districtId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'stateId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'countryId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'pinno': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'addressType': type
        });
    };
    EmployeeCreationNewComponent.prototype.OnClickOk = function () {
        this.message = '';
    };
    EmployeeCreationNewComponent.prototype.canCreate = function () {
        this.employeeInfo.controls.employeeBasicInfo.get('empMiddleName').setErrors(null);
        return !(this.employeeInfo.controls.employeeBasicInfo.valid);
    };
    /**
     * Initialize all the static lists
     */
    EmployeeCreationNewComponent.prototype.initiateLists = function () {
        var _this = this;
        var organizationObservable = this.organizationService.getOrganizations();
        var docTypeServiceObservable = this.docTypeService.getIdentityDocTypes();
        var countryServiceObservable = this.countryService.getCountries();
        this.processingInProgress = true;
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([organizationObservable, docTypeServiceObservable, countryServiceObservable])
            .subscribe(function (data) {
            _this.organizations = data[0];
            _this.identityDocTypes = data[1];
            _this.countries = data[2];
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    /**
     * Used to compare a salary compoenet against the max value allowed
     * @param value
     * @param maxValue
     */
    EmployeeCreationNewComponent.prototype.checkLimit = function (value, maxValue) {
        if (value > maxValue)
            return "red";
        else
            return "";
    };
    /**
     * Job role change handler, refresh the salary compoenents
     * @param jobRoleId
     */
    EmployeeCreationNewComponent.prototype.onJobRoleChange = function (jobRoleId) {
        var _this = this;
        console.log(jobRoleId);
        var salaryObservable = this.jobRoleService.getSalaryByJobRoleId(jobRoleId);
        var optionalCompObservable = this.jobRoleService.getOptionalBenefitsByJobRoleId(jobRoleId);
        this.processingInProgress = true;
        var dummySalComponents;
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([salaryObservable, optionalCompObservable])
            .subscribe(function (data) {
            _this.salaryComponents = data[0];
            for (var _i = 0, _a = _this.salaryComponents; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp['selected'] = true;
            }
            _this.optionalBenefitComponents = data[1];
            for (var _b = 0, _c = _this.optionalBenefitComponents; _b < _c.length; _b++) {
                var comp = _c[_b];
                comp['selected'] = false;
            }
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
        console.log(JSON.stringify(this.salaryComponents));
    };
    /**
     * Organization change handler
     * @param orgId
     */
    EmployeeCreationNewComponent.prototype.onOrgChange = function (orgId) {
        var _this = this;
        console.log(orgId);
        if (orgId === "")
            return;
        this.processingInProgress = true;
        var unitObservable = this.unitService.getUnits(orgId);
        var jobRoleObservable = this.jobRoleService.getJobRolesByOrgId(orgId);
        this.processingInProgress = true;
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([unitObservable, jobRoleObservable])
            .subscribe(function (data) {
            _this.units = data[0];
            _this.jobRoles = data[1];
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    /**
     * Country change handler
     * @param countryId
     * @param addressType
     */
    EmployeeCreationNewComponent.prototype.onCountryChange = function (countryId, addressType) {
        var _this = this;
        this.processingInProgress = true;
        this.stateService.getStates(countryId)
            .subscribe(function (data) {
            if (addressType === 'permanent') {
                _this.statesPermanent = data;
                console.log(JSON.stringify(_this.statesPermanent));
            }
            else if (addressType === 'present') {
                _this.statesPresent = data;
            }
            _this.processingInProgress = false;
        }, function (error) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
        var districts;
    };
    /**
     * State change handler (works for both present and permanent address)
     * @param stateId
     * @param addressType
     */
    EmployeeCreationNewComponent.prototype.onStateChange = function (stateId, addressType) {
        var _this = this;
        console.log(stateId + '~' + addressType);
        this.districtService.getDistricts(stateId)
            .subscribe(function (data) {
            if (addressType === 'permanent') {
                _this.districtsPermanent = data;
            }
            else if (addressType === 'present') {
                _this.districtsPresent = data;
            }
            _this.processingInProgress = false;
        }, function (error) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    /**
     * Unit change handler
     * @param unitId
     */
    EmployeeCreationNewComponent.prototype.onUnitChange = function (unitId) {
        var _this = this;
        console.log(unitId);
        if (unitId === "")
            return;
        this.departmentService.getDepartments(unitId)
            .subscribe(function (data) {
            _this.departments = data;
        }, function (error) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    /**
     * Copy permanent address to present address
     * Check the value of the copyAddress field and act accordingly
     */
    EmployeeCreationNewComponent.prototype.copyFromPermanent = function () {
        if (this.copyAddress === false)
            return;
        var houseNo = this.employeeInfo.get('employeeAddress').get('permanent').get('houseNo');
        var streetName = this.employeeInfo.get('employeeAddress').get('permanent').get('streetName');
        var region = this.employeeInfo.get('employeeAddress').get('permanent').get('region');
        var area = this.employeeInfo.get('employeeAddress').get('permanent').get('area');
        var districtId = this.employeeInfo.get('employeeAddress').get('permanent').get('districtId');
        var stateId = this.employeeInfo.get('employeeAddress').get('permanent').get('stateId');
        var countryId = this.employeeInfo.get('employeeAddress').get('permanent').get('countryId');
        var pinno = this.employeeInfo.get('employeeAddress').get('permanent').get('pinno');
        this.districtsPresent = this.districtsPermanent;
        this.statesPresent = this.statesPermanent;
        //copy the values now
        this.employeeInfo.get('employeeAddress').get('present').get('houseNo').setValue(houseNo.value);
        this.employeeInfo.get('employeeAddress').get('present').get('streetName').setValue(streetName.value);
        this.employeeInfo.get('employeeAddress').get('present').get('region').setValue(region.value);
        this.employeeInfo.get('employeeAddress').get('present').get('area').setValue(area.value);
        this.employeeInfo.get('employeeAddress').get('present').get('districtId').setValue(districtId.value);
        this.employeeInfo.get('employeeAddress').get('present').get('stateId').setValue(stateId.value);
        this.employeeInfo.get('employeeAddress').get('present').get('countryId').setValue(countryId.value);
        this.employeeInfo.get('employeeAddress').get('present').get('pinno').setValue(pinno.value);
    };
    /**
     * Crates the employee and shows the EMployee ID created
     */
    EmployeeCreationNewComponent.prototype.create = function () {
        var _this = this;
        var json = JSON.stringify(this.employeeInfo.controls.employeeBasicInfo.value);
        var salaryComponents = [];
        if (this.salaryComponents) {
            for (var _i = 0, _a = this.salaryComponents; _i < _a.length; _i++) {
                var comp = _a[_i];
                if (comp['selected'] === true) {
                    var obj_1 = {
                        'salaryComponent': { 'compId': comp['salCompId'] },
                        'salaryValue': comp['salValue']
                    };
                    salaryComponents.push(obj_1);
                }
            }
        }
        var obj = {
            'employeeBasicInfo': this.employeeInfo.controls.employeeBasicInfo.value,
            'employeeAddress': [this.employeeInfo.controls.employeeAddress.get('permanent').value,
                this.employeeInfo.controls.employeeAddress.get('present').value],
            'employeeAddlDetails': this.employeeInfo.controls.employeeAddlDetails.value,
            'employeeSalary': salaryComponents,
            'employeeHierarchy': this.employeeInfo.controls.otherDetails.value,
            'employeeProfile': this.employeeInfo.controls.employeeProfile.value
        };
        console.log(JSON.stringify(obj));
        this.processingInProgress = true;
        this.employeeService.create(obj)
            .subscribe(function (res) {
            _this.processingInProgress = false;
            _this.message = res.json()['message'];
        }, function (err) {
            _this.message = err.json()["message"];
            _this.processingInProgress = false;
        });
    };
    /**
     *
     * @param event Date change handler for Employee Creation
     * the labelName guides which field is to be changed
     * @param labelName
     */
    EmployeeCreationNewComponent.prototype.changeDate = function (event, labelName) {
        if (labelName === 'preMedicalCheckUpDate') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('employeeAddlDetails').patchValue({ preMedicalCheckUpDate: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('employeeAddlDetails').patchValue({ preMedicalCheckUpDate: '' });
            }
        }
        else if (labelName === 'dob') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ dob: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ dob: '' });
            }
        }
        else if (labelName === 'doj') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ doj: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ doj: '' });
            }
        }
        else if (labelName === 'probationPeriodEndDate') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('otherDetails').patchValue({ probationPeriodEndDate: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('otherDetails').patchValue({ probationPeriodEndDate: '' });
            }
        }
    };
    return EmployeeCreationNewComponent;
}());
EmployeeCreationNewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-employee-creation-new',
        template: __webpack_require__(475),
        styles: [__webpack_require__(459)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_organization_service__["a" /* OrganizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_organization_service__["a" /* OrganizationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_unit_service__["a" /* UnitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_unit_service__["a" /* UnitService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_department_service__["a" /* DepartmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_department_service__["a" /* DepartmentService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_employee_service__["a" /* EmployeeService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_9__services_district_service__["a" /* DistrictService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_district_service__["a" /* DistrictService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_10__services_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_state_service__["a" /* StateService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_11__services_job_role_service__["a" /* JobRoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__services_job_role_service__["a" /* JobRoleService */]) === "function" && _k || Object])
], EmployeeCreationNewComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=employee-creation-new.component.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_department_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_organization_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_unit_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_country_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_employee_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_district_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_state_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_job_role_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeCreationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var EmployeeCreationComponent = (function () {
    function EmployeeCreationComponent(formBuilder, organizationService, unitService, departmentService, docTypeService, countryService, employeeService, districtService, stateService, jobRoleService) {
        this.formBuilder = formBuilder;
        this.organizationService = organizationService;
        this.unitService = unitService;
        this.departmentService = departmentService;
        this.docTypeService = docTypeService;
        this.countryService = countryService;
        this.employeeService = employeeService;
        this.districtService = districtService;
        this.stateService = stateService;
        this.jobRoleService = jobRoleService;
        this.processingInProgress = false;
        this.message = '';
        this.autoCompleteSuggestions = {
            supervisorEmailIdSuggestions: Array(), hrEmailIdSuggestions: Array()
        };
        this.valueChanged = true;
    }
    EmployeeCreationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeInfo = this.formBuilder.group({
            'employeeBasicInfo': this.initBasicInfoControls(),
            'employeeAddress': this.formBuilder.group({
                'permanent': this.initAddressGroup('permanent'),
                'present': this.initAddressGroup('present')
            }),
            'employeeAddlDetails': this.initAdditionalInfoControls(),
            'employeeJobRoleDetails': this.formBuilder.group({
                'jobRoleId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'otherDetails': this.otherDetailsControls(),
            'employeeProfile': this.formBuilder.group({
                'qualification': [''],
                'description': [''],
                'comments': ['']
            })
        });
        this.initiateLists();
        this.employeeInfo.controls.otherDetails.get("hrEmailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('hrEmailId', emailId)
                .subscribe(function (data) {
                console.log(data);
                _this.autoCompleteSuggestions.hrEmailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.hrEmailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.employeeInfo.controls.otherDetails.get("supervisorEmailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('supervisorEmailId', emailId)
                .subscribe(function (data) {
                console.log(data);
                _this.autoCompleteSuggestions.supervisorEmailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.supervisorEmailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
    };
    EmployeeCreationComponent.prototype.otherDetailsControls = function () {
        return this.formBuilder.group({
            'hrEmailId': [''],
            'supervisorEmailId': [''],
            'cl': [''],
            'maternityLeave': [],
            'paternityLeave': [],
            'pl': [],
            'specialLeave': [],
            'sickLeave': [],
            'probationPeriodEndDate': ['']
        });
    };
    EmployeeCreationComponent.prototype.initAdditionalInfoControls = function () {
        return this.formBuilder.group({
            'dependentNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validNumeric])],
            'siblingNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validNumeric])],
            'emergencyContactName': [''],
            'emergencyContactNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validPhone])],
            'medicalReportComment': [''],
            'preMedicalCheckUpDate': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].properDate])],
            'nomineeName1': [''],
            'nomineeShare1': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validNumeric])],
            'nomineeName2': [''],
            'nomineeShare2': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validNumeric])],
            'nomineeName3': [''],
            'nomineeShare3': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validNumeric])]
        });
    };
    EmployeeCreationComponent.prototype.initBasicInfoControls = function () {
        return this.formBuilder.group({
            'title': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'empFirstName': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'empMiddleName': [''],
            'empLastName': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'fatherName': [''],
            'dob': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].properDate])],
            'emailId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validEmail])],
            'contactNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].validPhone])],
            'nationality': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'doj': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_12__validators_custom_validators__["a" /* CustomValidator */].properDate])],
            'organization': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'department': this.formBuilder.group({
                'departmentId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'unit': this.formBuilder.group({
                'unitId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'empType': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'sex': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'maritalStatus': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'identityDocType': this.formBuilder.group({
                'docTypeId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
            }),
            'identityNumber': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'hrFlag': [''],
            'supervisorFlag': ['']
        });
    };
    /**
     * Create form builder group for address
     */
    EmployeeCreationComponent.prototype.initAddressGroup = function (type) {
        return this.formBuilder.group({
            'houseNo': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'streetName': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'region': [''],
            'area': [''],
            'districtId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'stateId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'countryId': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'pinno': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            'addressType': type
        });
    };
    EmployeeCreationComponent.prototype.OnClickOk = function () {
        this.message = '';
        this.ngOnInit();
    };
    EmployeeCreationComponent.prototype.canCreate = function () {
        this.employeeInfo.controls.employeeBasicInfo.get('empMiddleName').setErrors(null);
        return !(this.employeeInfo.controls.employeeBasicInfo.valid);
    };
    /**
     * Initialize all the static lists
     */
    EmployeeCreationComponent.prototype.initiateLists = function () {
        var _this = this;
        if (this.organizations === undefined) {
            var organizationObservable = this.organizationService.getOrganizations();
            var docTypeServiceObservable = this.docTypeService.getIdentityDocTypes();
            var countryServiceObservable = this.countryService.getCountries();
            this.processingInProgress = true;
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([organizationObservable, docTypeServiceObservable, countryServiceObservable])
                .subscribe(function (data) {
                _this.organizations = data[0];
                _this.identityDocTypes = data[1];
                _this.countries = data[2];
            }, function (err) {
                _this.processingInProgress = false;
            }, function () {
                _this.processingInProgress = false;
            });
        }
    };
    /**
     * Used to compare a salary compoenet against the max value allowed
     * @param value
     * @param maxValue
     */
    EmployeeCreationComponent.prototype.checkLimit = function (value, maxValue) {
        if (value > maxValue)
            return "red";
        else
            return "";
    };
    /**
     * Job role change handler, refresh the salary compoenents
     * @param jobRoleId
     */
    EmployeeCreationComponent.prototype.onJobRoleChange = function (jobRoleId) {
        var _this = this;
        console.log(jobRoleId);
        var salaryObservable = this.jobRoleService.getSalaryByJobRoleId(jobRoleId);
        var optionalCompObservable = this.jobRoleService.getOptionalBenefitsByJobRoleId(jobRoleId);
        this.processingInProgress = true;
        var dummySalComponents;
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([salaryObservable, optionalCompObservable])
            .subscribe(function (data) {
            _this.salaryComponents = data[0];
            for (var _i = 0, _a = _this.salaryComponents; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp['selected'] = true;
            }
            _this.optionalBenefitComponents = data[1];
            for (var _b = 0, _c = _this.optionalBenefitComponents; _b < _c.length; _b++) {
                var comp = _c[_b];
                comp['selected'] = false;
            }
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
        console.log(JSON.stringify(this.salaryComponents));
    };
    /**
     * Organization change handler
     * @param orgId
     */
    EmployeeCreationComponent.prototype.onOrgChange = function (orgId) {
        var _this = this;
        console.log(orgId);
        if (orgId === "")
            return;
        this.processingInProgress = true;
        var unitObservable = this.unitService.getUnits(orgId);
        var jobRoleObservable = this.jobRoleService.getJobRolesByOrgId(orgId);
        this.processingInProgress = true;
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([unitObservable, jobRoleObservable])
            .subscribe(function (data) {
            _this.units = data[0];
            _this.jobRoles = data[1];
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    /**
     * Country change handler
     * @param countryId
     * @param addressType
     */
    EmployeeCreationComponent.prototype.onCountryChange = function (countryId, addressType) {
        var _this = this;
        this.processingInProgress = true;
        this.stateService.getStates(countryId)
            .subscribe(function (data) {
            if (addressType === 'permanent') {
                _this.statesPermanent = data;
                console.log(JSON.stringify(_this.statesPermanent));
            }
            else if (addressType === 'present') {
                _this.statesPresent = data;
            }
            _this.processingInProgress = false;
        }, function (error) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
        var districts;
    };
    /**
     * State change handler (works for both present and permanent address)
     * @param stateId
     * @param addressType
     */
    EmployeeCreationComponent.prototype.onStateChange = function (stateId, addressType) {
        var _this = this;
        console.log(stateId + '~' + addressType);
        this.districtService.getDistricts(stateId)
            .subscribe(function (data) {
            if (addressType === 'permanent') {
                _this.districtsPermanent = data;
            }
            else if (addressType === 'present') {
                _this.districtsPresent = data;
            }
            _this.processingInProgress = false;
        }, function (error) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    /**
     * Unit change handler
     * @param unitId
     */
    EmployeeCreationComponent.prototype.onUnitChange = function (unitId) {
        var _this = this;
        console.log(unitId);
        if (unitId === "")
            return;
        this.departmentService.getDepartments(unitId)
            .subscribe(function (data) {
            _this.departments = data;
        }, function (error) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
    };
    EmployeeCreationComponent.prototype.canDeactivate = function () {
        console.log('i am navigating away');
        if (this.employeeInfo.dirty) {
            return window.confirm('Discard changes?');
        }
        return true;
    };
    /**
     * Copy permanent address to present address
     * Check the value of the copyAddress field and act accordingly
     */
    EmployeeCreationComponent.prototype.copyFromPermanent = function () {
        if (this.copyAddress === false)
            return;
        var houseNo = this.employeeInfo.get('employeeAddress').get('permanent').get('houseNo');
        var streetName = this.employeeInfo.get('employeeAddress').get('permanent').get('streetName');
        var region = this.employeeInfo.get('employeeAddress').get('permanent').get('region');
        var area = this.employeeInfo.get('employeeAddress').get('permanent').get('area');
        var districtId = this.employeeInfo.get('employeeAddress').get('permanent').get('districtId');
        var stateId = this.employeeInfo.get('employeeAddress').get('permanent').get('stateId');
        var countryId = this.employeeInfo.get('employeeAddress').get('permanent').get('countryId');
        var pinno = this.employeeInfo.get('employeeAddress').get('permanent').get('pinno');
        this.districtsPresent = this.districtsPermanent;
        this.statesPresent = this.statesPermanent;
        //copy the values now
        this.employeeInfo.get('employeeAddress').get('present').get('houseNo').setValue(houseNo.value);
        this.employeeInfo.get('employeeAddress').get('present').get('streetName').setValue(streetName.value);
        this.employeeInfo.get('employeeAddress').get('present').get('region').setValue(region.value);
        this.employeeInfo.get('employeeAddress').get('present').get('area').setValue(area.value);
        this.employeeInfo.get('employeeAddress').get('present').get('districtId').setValue(districtId.value);
        this.employeeInfo.get('employeeAddress').get('present').get('stateId').setValue(stateId.value);
        this.employeeInfo.get('employeeAddress').get('present').get('countryId').setValue(countryId.value);
        this.employeeInfo.get('employeeAddress').get('present').get('pinno').setValue(pinno.value);
    };
    /**
     * Crates the employee and shows the EMployee ID created
     */
    EmployeeCreationComponent.prototype.create = function () {
        var _this = this;
        var json = JSON.stringify(this.employeeInfo.controls.employeeBasicInfo.value);
        var salaryComponents = [];
        if (this.salaryComponents) {
            for (var _i = 0, _a = this.salaryComponents; _i < _a.length; _i++) {
                var comp = _a[_i];
                if (comp['selected'] === true) {
                    var obj_1 = {
                        'salaryComponent': { 'compId': comp['salCompId'] },
                        'salaryValue': comp['salValue']
                    };
                    salaryComponents.push(obj_1);
                }
            }
        }
        var obj = {
            'employeeBasicInfo': this.employeeInfo.controls.employeeBasicInfo.value
        };
        if (!this.employeeInfo.controls.employeeAddress.pristine) {
            obj['employeeAddress'] = [this.employeeInfo.controls.employeeAddress.get('permanent').value,
                this.employeeInfo.controls.employeeAddress.get('present').value];
        }
        if (!this.employeeInfo.controls.employeeAddlDetails.pristine) {
            obj['employeeAddlDetails'] = this.employeeInfo.controls.employeeAddlDetails.value;
        }
        if (!this.employeeInfo.controls.employeeJobRoleDetails.pristine) {
            obj['employeeSalary'] = salaryComponents;
        }
        if (!this.employeeInfo.controls.otherDetails.pristine) {
            obj['employeeHierarchy'] = this.employeeInfo.controls.otherDetails.value;
        }
        if (!this.employeeInfo.controls.employeeProfile.pristine) {
            obj['employeeProfile'] = this.employeeInfo.controls.otherDetails.value;
        }
        console.log(JSON.stringify(obj));
        this.processingInProgress = true;
        this.employeeService.create(obj)
            .subscribe(function (res) {
            _this.processingInProgress = false;
            _this.message = res.json()['message'];
        }, function (err) {
            _this.message = err.json()["message"];
            _this.processingInProgress = false;
        });
    };
    /**
     *
     * @param event Date change handler for Employee Creation
     * the labelName guides which field is to be changed
     * @param labelName
     */
    EmployeeCreationComponent.prototype.changeDate = function (event, labelName) {
        if (labelName === 'preMedicalCheckUpDate') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('employeeAddlDetails').patchValue({ preMedicalCheckUpDate: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('employeeAddlDetails').patchValue({ preMedicalCheckUpDate: '' });
            }
        }
        else if (labelName === 'dob') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ dob: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ dob: '' });
            }
        }
        else if (labelName === 'doj') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ doj: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('employeeBasicInfo').patchValue({ doj: '' });
            }
        }
        else if (labelName === 'probationPeriodEndDate') {
            if (event.type === 'dateChanged') {
                this.employeeInfo.get('otherDetails').patchValue({ probationPeriodEndDate: event.data.formatted });
            }
            if (event.type === 'clear') {
                this.employeeInfo.get('otherDetails').patchValue({ probationPeriodEndDate: '' });
            }
        }
    };
    return EmployeeCreationComponent;
}());
EmployeeCreationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-employee-creation',
        template: __webpack_require__(476),
        styles: [__webpack_require__(460)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_organization_service__["a" /* OrganizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_organization_service__["a" /* OrganizationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_unit_service__["a" /* UnitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_unit_service__["a" /* UnitService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_department_service__["a" /* DepartmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_department_service__["a" /* DepartmentService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_employee_service__["a" /* EmployeeService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_9__services_district_service__["a" /* DistrictService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_district_service__["a" /* DistrictService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_10__services_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_state_service__["a" /* StateService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_11__services_job_role_service__["a" /* JobRoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__services_job_role_service__["a" /* JobRoleService */]) === "function" && _k || Object])
], EmployeeCreationComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=employee-creation.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_employee_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_country_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_file_saver__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_file_saver__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EmployeeDetailsComponent = (function () {
    function EmployeeDetailsComponent(formBuilder, employeeService, activatedRoute, router, docTypeService, countryService) {
        this.formBuilder = formBuilder;
        this.employeeService = employeeService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.docTypeService = docTypeService;
        this.countryService = countryService;
        this.processingInProgress = false;
        this.showEditBasicInfo = false;
        this.selectedDocId = 0;
        this.selectedDocument = "about:blank";
        this.modalDisplay = false;
        this.showDocumentEdit = false;
        this.documentEditFunctionInvoked = false;
        this.showUpdateMessage = false;
    }
    EmployeeDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeInfo = this.activatedRoute.snapshot.data['employeeInfo'];
        this.activatedRoute
            .paramMap
            .subscribe(function (params) {
            _this.id = params.get("id");
        });
        if (this.employeeInfo === undefined) {
            this.activatedRoute
                .paramMap
                .subscribe(function (params) {
                _this.processingInProgress = true;
                var employeeBasicInfoObservable = _this.employeeService.readDetails(_this.id)
                    .finally(function () { _this.processingInProgress = false; })
                    .subscribe(function (data) {
                    _this.employeeInfo = data;
                }, function (err) {
                    if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                        _this.router.navigate(['forbidden']);
                    }
                    if (err.status === 404) {
                        _this.router.navigate(['404']);
                    }
                }, function () {
                    _this.formGroupInitializer();
                });
            });
        }
        else {
            this.formGroupInitializer();
        }
    };
    EmployeeDetailsComponent.prototype.formGroupInitializer = function () {
        this.formGroupBasicInfo = this.formBuilder.group({
            'title': [this.employeeInfo.employeeBasicInfo.title, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'empFirstName': [this.employeeInfo.employeeBasicInfo.empFirstName, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'empMiddleName': [this.employeeInfo.employeeBasicInfo.empMiddleName],
            'empLastName': [this.employeeInfo.employeeBasicInfo.empLastName, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'fatherName': [this.employeeInfo.employeeBasicInfo.fatherName],
            'dob': [this.employeeInfo.employeeBasicInfo.dob, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'emailId': [this.employeeInfo.employeeBasicInfo.emailId],
            'contactNo': [this.employeeInfo.employeeBasicInfo.contactNo, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'nationality': [this.employeeInfo.employeeBasicInfo.nationality, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'doj': [this.employeeInfo.employeeBasicInfo.doj],
            'organizationId': [this.employeeInfo.employeeBasicInfo.organizationId],
            'department': this.formBuilder.group({
                'departmentId': [this.employeeInfo.employeeBasicInfo.department.departmentId]
            }),
            'unit': this.formBuilder.group({
                'unitId': [this.employeeInfo.employeeBasicInfo.unit.unitId]
            }),
            'empType': [this.employeeInfo.employeeBasicInfo.empType, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'sex': [this.employeeInfo.employeeBasicInfo.sex, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'maritalStatus': [this.employeeInfo.employeeBasicInfo.maritalStatus, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'identityDocType': this.formBuilder.group({
                'docTypeId': [this.employeeInfo.employeeBasicInfo.identityDocType.docTypeId, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required]
            }),
            'identityNumber': [this.employeeInfo.employeeBasicInfo.identityNumber, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'hrFlag': [this.employeeInfo.employeeBasicInfo.hrFlag],
            'supervisorFlag': [this.employeeInfo.employeeBasicInfo.supervisorFlag]
        });
        this.formGroupDocument = this.formBuilder.group({
            'docId': [""],
            'docTypeId': [""],
            'remarks': [""],
            'document': [""],
            'documentName': [""]
        });
    };
    EmployeeDetailsComponent.prototype.profileImageUpload = function (event) {
        var reader = new FileReader();
        reader.readAsDataURL(event.srcElement.files[0]);
        var me = this;
        reader.onload = function () {
            var fileContent = reader.result;
            me.processingInProgress = true;
            me.employeeService.uploadProfileImage(me.id, { "profileImage": fileContent })
                .finally(function () {
                me.processingInProgress = false;
            })
                .subscribe(function (data) {
            }, function (err) {
                if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                    me.router.navigate(['forbidden']);
                }
                if (err.status === 404) {
                    me.router.navigate(['404']);
                }
            }, function () {
                me.employeeInfo.employeeBasicInfo.profileImage = fileContent;
                me.showUpdateMessage = true;
            });
        };
    };
    EmployeeDetailsComponent.prototype.editBasicInfo = function () {
        var _this = this;
        if (this.identityDocTypes === undefined) {
            var docTypeServiceObservable = this.docTypeService.getIdentityDocTypes();
            var countryServiceObservable = this.countryService.getCountries();
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([docTypeServiceObservable, countryServiceObservable])
                .finally(function () { _this.processingInProgress = false; })
                .subscribe(function (data) {
                _this.identityDocTypes = data[0];
                _this.countries = data[1];
            }, function (err) {
                if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                    _this.router.navigate(['forbidden']);
                }
                if (err.status === 404) {
                    _this.router.navigate(['404']);
                }
            }, function () {
                _this.showEditBasicInfo = true;
                _this.modalDisplay = true;
            });
        }
        else {
            this.showEditBasicInfo = true;
            this.modalDisplay = true;
        }
    };
    EmployeeDetailsComponent.prototype.getShowEditBasicInfo = function () {
        return this.showEditBasicInfo;
    };
    EmployeeDetailsComponent.prototype.onBasicInfoUpdate = function () {
        var _this = this;
        this.processingInProgress = true;
        this.employeeService.updateBasicInfo(this.id, this.formGroupBasicInfo.value)
            .finally(function () {
            _this.processingInProgress = false;
            _this.showEditBasicInfo = false;
        })
            .subscribe(function (data) {
        }, function (err) {
            if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                _this.router.navigate(['forbidden']);
            }
            if (err.status === 404) {
                _this.router.navigate(['404']);
            }
        }, function () {
            _this.employeeInfo.employeeBasicInfo = Object.assign(_this.employeeInfo.employeeBasicInfo, _this.formGroupBasicInfo.value);
        });
    };
    EmployeeDetailsComponent.prototype.isProcessingInProgress = function () {
        return this.processingInProgress;
    };
    EmployeeDetailsComponent.prototype.getSelectedDocId = function () {
        return this.selectedDocId;
    };
    EmployeeDetailsComponent.prototype.setSelectedDocId = function (docId) {
        var _this = this;
        this.selectedDocId = docId;
        this.employeeService.getDocument(docId, this.id)
            .subscribe(function (data) {
            if ((navigator.appVersion.indexOf("MSIE") !== -1) || (!!window["MSInputMethodContext"] && !!document["documentMode"])) {
                var abc = data.document.split(',')[1].replace(/\s/g, '');
                var byteString = atob(abc);
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([ia], { type: 'application/pdf' });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_file_saver__["saveAs"])(blob, "hrmsdocument.pdf");
                _this.selectedDocument = "hrmsdocument.pdf";
            }
            else {
                _this.selectedDocDetails = data;
                _this.selectedDocument = data.document;
            }
        }, function (err) {
        });
    };
    EmployeeDetailsComponent.prototype.closeAllDialog = function (event) {
        if (event === null || event.undefined || event.currentTarget === event.target) {
            this.showEditBasicInfo = false;
            this.modalDisplay = false;
            this.showDocumentEdit = false;
            this.documentEditFunctionInvoked = false;
        }
    };
    EmployeeDetailsComponent.prototype.handleKeyboardEvent = function (event) {
        if (event.keyCode === 27) {
            this.closeAllDialog(null);
        }
    };
    EmployeeDetailsComponent.prototype.editDocument = function () {
        var _this = this;
        if (this.docTypes === undefined && this.selectedDocDetails !== undefined) {
            var docTypeServiceObservable = this.docTypeService.getDocTypes()
                .finally(function () { _this.processingInProgress = false; })
                .subscribe(function (data) {
                _this.docTypes = data;
            }, function (err) {
                if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                    _this.router.navigate(['forbidden']);
                }
                if (err.status === 404) {
                    _this.router.navigate(['404']);
                }
            }, function () {
                _this.showDocumentEdit = true;
                _this.modalDisplay = true;
                _this.initializeDocumentEditForm();
            });
        }
        else if (this.selectedDocDetails !== undefined) {
            this.showDocumentEdit = true;
            this.modalDisplay = true;
            this.initializeDocumentEditForm();
        }
        else {
            this.documentEditFunctionInvoked = true;
        }
    };
    EmployeeDetailsComponent.prototype.initializeDocumentEditForm = function () {
        this.formGroupDocument.setValue({
            'docId': this.selectedDocDetails.docId,
            'docTypeId': this.selectedDocDetails.docTypeId,
            'remarks': this.selectedDocDetails.remarks,
            'document': this.selectedDocDetails.document,
            'documentName': ""
        });
    };
    EmployeeDetailsComponent.prototype.addDocument = function () {
    };
    EmployeeDetailsComponent.prototype.getShowDocumentEdit = function () {
        return this.showDocumentEdit;
    };
    EmployeeDetailsComponent.prototype.onDocumentUpdate = function () {
        var _this = this;
        this.processingInProgress = true;
        this.employeeService.documentSave(this.formGroupDocument.value, this.id)
            .finally(function () {
            _this.processingInProgress = false;
            _this.closeAllDialog(null);
        })
            .subscribe(function (res) {
            _this.selectedDocument = _this.formGroupDocument.value.document;
            console.log(_this.formGroupDocument.value.document);
        }, function (err) {
        }, function () {
        });
    };
    EmployeeDetailsComponent.prototype.documentUpload = function (event) {
        console.log(event);
        this.formGroupDocument.controls['documentName'].setValue(event.srcElement.files[0].name);
        var reader = new FileReader();
        reader.readAsDataURL(event.srcElement.files[0]);
        var me = this;
        reader.onload = function () {
            me.formGroupDocument.controls['document'].setValue(reader.result);
        };
    };
    EmployeeDetailsComponent.prototype.getShowSelectDocumentAlert = function () {
        if (this.selectedDocDetails === undefined && this.documentEditFunctionInvoked) {
            return true;
        }
        else {
            return false;
        }
    };
    EmployeeDetailsComponent.prototype.getShowUpdateMessage = function () {
        return this.showUpdateMessage;
    };
    EmployeeDetailsComponent.prototype.onClickUpdateMessageOk = function () {
        this.showUpdateMessage = false;
    };
    return EmployeeDetailsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('document:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeDetailsComponent.prototype, "handleKeyboardEvent", null);
EmployeeDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-employee-details',
        template: __webpack_require__(477),
        styles: [__webpack_require__(461)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */]) === "function" && _f || Object])
], EmployeeDetailsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=employee-details.component.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_employee_service__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeHierarchySearchResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmployeeHierarchySearchResultComponent = (function () {
    function EmployeeHierarchySearchResultComponent(activatedRoute, router, employeeService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.employeeService = employeeService;
        this.pagination = { pageSize: 20, lowerRange: 0, upperRange: 0, disableNext: false, disablePrevious: false, searchResultSetSize: 0 };
        this.filter = { employeeId: String, employeeName: String, emailId: String, contactNumber: String, designation: String };
        this.employeeSearchCriteria = { firstName: "", middleName: "", lastName: "", employeeId: "", employmentType: "", emailId: "", orgId: "", unitId: "", departmentId: "", jobRoleId: "", designationId: "", supervisorFlag: "", hrFlag: "", supervisorEmailId: "", hrEmailId: "", sex: "", identityDocTypeId: "", identityNumber: "" };
    }
    EmployeeHierarchySearchResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchResult = this.activatedRoute.snapshot.data['searchResult'];
        this.filteredResult = this.activatedRoute.snapshot.data['searchResult'];
        if (this.searchResult == undefined) {
            this.activatedRoute.queryParams.subscribe(function (params) {
                _this.employeeSearchCriteria.firstName = params['firstName'];
                _this.employeeSearchCriteria.middleName = params['middleName'];
                _this.employeeSearchCriteria.lastName = params['lastName'];
                _this.employeeSearchCriteria.employeeId = params['employeeId'];
                _this.employeeSearchCriteria.employmentType = params['employmentType'];
                _this.employeeSearchCriteria.emailId = params['emailId'];
                _this.employeeSearchCriteria.orgId = params['orgId'];
                _this.employeeSearchCriteria.unitId = params['unitId'];
                _this.employeeSearchCriteria.departmentId = params['departmentId'];
                _this.employeeSearchCriteria.jobRoleId = params['jobRoleId'];
                _this.employeeSearchCriteria.designationId = params['designationId'];
                _this.employeeSearchCriteria.supervisorFlag = params['supervisorFlag'];
                _this.employeeSearchCriteria.hrFlag = params['hrFlag'];
                _this.employeeSearchCriteria.supervisorEmailId = params['supervisorEmailId'];
                _this.employeeSearchCriteria.hrEmailId = params['hrEmailId'];
                _this.employeeSearchCriteria.sex = params['sex'];
                _this.employeeSearchCriteria.identityDocTypeId = params['identityDocTypeId'];
                _this.employeeSearchCriteria.identityNumber = params['identityNumber'];
            });
            this.employeeService.search(this.employeeSearchCriteria)
                .subscribe(function (data) {
                _this.searchResult = data;
                _this.filteredResult = data;
                _this.goToFirstPage(_this.filteredResult);
            }, function (err) {
                if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                    _this.router.navigate(['forbidden']);
                }
            }, function () {
            });
        }
        else {
            this.goToFirstPage(this.filteredResult);
        }
    };
    EmployeeHierarchySearchResultComponent.prototype.filterEmployee = function ($event, fieldName) {
        if (fieldName === "employeeId")
            this.filter.employeeId = $event.target.value;
        if (fieldName === "employeeName")
            this.filter.employeeName = $event.target.value;
        if (fieldName === "emailId")
            this.filter.emailId = $event.target.value;
        if (fieldName === "contactNumber")
            this.filter.contactNumber = $event.target.value;
        if (fieldName === "designation")
            this.filter.designation = $event.target.value;
        var filteredEmp = new Array();
        for (var _i = 0, _a = this.searchResult; _i < _a.length; _i++) {
            var emp = _a[_i];
            if ((!!this.filter.employeeId && (new String(emp.empId)).toUpperCase().indexOf(this.filter.employeeId.toString().toUpperCase()) > -1)
                || (!!this.filter.employeeName && (new String(emp.name)).toUpperCase().indexOf(this.filter.employeeName.toString().toUpperCase()) > -1)
                || (!!this.filter.emailId && (new String(emp.emailId)).toUpperCase().indexOf(this.filter.emailId.toString().toUpperCase()) > -1)
                || (!!this.filter.contactNumber && (new String(emp.contactNo)).toUpperCase().indexOf(this.filter.contactNumber.toString().toUpperCase()) > -1)
                || (!!this.filter.designation && (new String(emp.designation)).toUpperCase().indexOf(this.filter.designation.toString().toUpperCase()) > -1)) {
                filteredEmp.push(emp);
            }
            else if (!$event.target.value) {
                filteredEmp.push(emp);
            }
        }
        this.filteredResult = filteredEmp;
        this.goToFirstPage(this.filteredResult);
    };
    EmployeeHierarchySearchResultComponent.prototype.goToFirstPage = function (filteredResult) {
        this.pagination.lowerRange = filteredResult.length === 0 ? 0 : 1;
        if (filteredResult.length >= this.pagination.pageSize) {
            this.employees = this.filteredResult.slice(0, this.pagination.pageSize);
            this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
            this.pagination.disableNext = false;
            this.pagination.disablePrevious = true;
        }
        else {
            this.employees = this.filteredResult;
            this.pagination.upperRange = this.filteredResult.length;
            this.pagination.disableNext = true;
            this.pagination.disablePrevious = true;
        }
        this.pagination.searchResultSetSize = this.filteredResult.length;
    };
    EmployeeHierarchySearchResultComponent.prototype.next = function () {
        if (this.pagination.disableNext)
            return;
        this.pagination.lowerRange = this.pagination.lowerRange + this.pagination.pageSize;
        this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
        this.pagination.disablePrevious = false;
        if (this.pagination.upperRange >= this.pagination.searchResultSetSize) {
            this.pagination.upperRange = this.pagination.searchResultSetSize;
            this.pagination.disableNext = true;
        }
        this.employees = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
    };
    EmployeeHierarchySearchResultComponent.prototype.previous = function () {
        if (this.pagination.disablePrevious)
            return;
        this.pagination.lowerRange = this.pagination.lowerRange - this.pagination.pageSize;
        this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
        this.pagination.disableNext = false;
        if (this.pagination.lowerRange <= 1) {
            this.pagination.lowerRange = 1;
            this.pagination.disablePrevious = true;
        }
        this.employees = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
    };
    EmployeeHierarchySearchResultComponent.prototype.backToSearchCriteria = function () {
        this.router.navigate(['employeeHierarchySearch']);
    };
    return EmployeeHierarchySearchResultComponent;
}());
EmployeeHierarchySearchResultComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-employee-hierarchy-search-result',
        template: __webpack_require__(478),
        styles: [__webpack_require__(462)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_employee_service__["a" /* EmployeeService */]) === "function" && _c || Object])
], EmployeeHierarchySearchResultComponent);

var _a, _b, _c;
//# sourceMappingURL=employee-hierarchy-search-result.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_department_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_organization_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_unit_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_doc_type_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_job_role_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_designation_service__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_employee_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_forkJoin__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_debounceTime_js__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_debounceTime_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_debounceTime_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeHierarchySearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var EmployeeHierarchySearchComponent = (function () {
    function EmployeeHierarchySearchComponent(formBuilder, organizationService, unitService, departmentService, docTypeService, jobRoleService, designationService, employeeService, router) {
        this.formBuilder = formBuilder;
        this.organizationService = organizationService;
        this.unitService = unitService;
        this.departmentService = departmentService;
        this.docTypeService = docTypeService;
        this.jobRoleService = jobRoleService;
        this.designationService = designationService;
        this.employeeService = employeeService;
        this.router = router;
        this.processingInProgress = false;
        this.autoCompleteSuggestions = {
            firstNameSuggestions: Array(), middleNameSuggestions: Array(),
            lastNameSuggestions: Array(), emailIdSuggestions: Array(),
            supervisorEmailIdSuggestions: Array(), hrEmailIdSuggestions: Array()
        };
        this.valueChanged = true;
    }
    EmployeeHierarchySearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formGroupSearch = this.formBuilder.group({
            firstName: ['', []],
            middleName: ['', []],
            lastName: ['', []],
            designationId: ['', []],
            departmentId: ['', []],
            employeeId: ['', []],
            emailId: ['', []],
            contactNo: ['', []],
            empType: ['', []],
            orgId: ['', []],
            unitId: ['', []],
            jobRoleId: ['', []],
            isSupervisor: ['', []],
            isHr: ['', []],
            supervisorEmailId: ['', []],
            hrEmailId: ['', []],
            sex: ['', []],
            identityDocTypeId: ['', []],
            identityDocNumber: ['', []],
            nationality: ['', []]
        });
        var organizationObservable = this.organizationService.getOrganizations();
        var docTypeServiceObservable = this.docTypeService.getIdentityDocTypes();
        this.processingInProgress = true;
        __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].forkJoin([organizationObservable, docTypeServiceObservable])
            .subscribe(function (data) {
            _this.organizations = data[0];
            _this.identityDocTypes = data[1];
        }, function (err) {
            _this.processingInProgress = false;
        }, function () {
            _this.processingInProgress = false;
        });
        this.formGroupSearch.get("firstName").valueChanges.debounceTime(400)
            .subscribe(function (firstName) {
            _this.employeeService.autoComplete('empFirstName', firstName)
                .subscribe(function (data) {
                _this.autoCompleteSuggestions.firstNameSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.firstNameSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.formGroupSearch.get("middleName").valueChanges.debounceTime(400)
            .subscribe(function (middleName) {
            _this.employeeService.autoComplete('empMiddleName', middleName)
                .subscribe(function (data) {
                _this.autoCompleteSuggestions.middleNameSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.middleNameSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.formGroupSearch.get("lastName").valueChanges.debounceTime(400)
            .subscribe(function (lastName) {
            _this.employeeService.autoComplete('empLastName', lastName)
                .subscribe(function (data) {
                _this.autoCompleteSuggestions.lastNameSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.lastNameSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.formGroupSearch.get("emailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('empEmailId', emailId)
                .subscribe(function (data) {
                _this.autoCompleteSuggestions.emailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.emailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.formGroupSearch.get("supervisorEmailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('supervisorEmailId', emailId)
                .subscribe(function (data) {
                _this.autoCompleteSuggestions.supervisorEmailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.supervisorEmailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
        this.formGroupSearch.get("hrEmailId").valueChanges.debounceTime(400)
            .subscribe(function (emailId) {
            _this.employeeService.autoComplete('hrEmailId', emailId)
                .subscribe(function (data) {
                _this.autoCompleteSuggestions.hrEmailIdSuggestions = data;
                _this.valueChanged = false;
            }, function (err) {
            }, function () {
                if (_this.valueChanged === true) {
                    _this.autoCompleteSuggestions.hrEmailIdSuggestions = null;
                }
                if (_this.valueChanged === false) {
                    _this.valueChanged = true;
                }
            });
        });
    };
    EmployeeHierarchySearchComponent.prototype.onOrgChange = function (orgId) {
        var _this = this;
        var jobRoleObservable = this.jobRoleService.getJobRolesByOrgId(orgId);
        var unitObservable = this.unitService.getUnits(orgId);
        __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].forkJoin([jobRoleObservable, unitObservable])
            .subscribe(function (data) {
            _this.jobRoles = data[0];
            _this.units = data[1];
        }, function (err) {
        }, function () {
        });
        this.unitService.getUnits(orgId)
            .subscribe(function (data) {
            _this.units = data;
        });
    };
    EmployeeHierarchySearchComponent.prototype.onUnitChange = function (unitId) {
        var _this = this;
        this.departmentService.getDepartments(unitId)
            .subscribe(function (data) {
            _this.departments = data;
        });
    };
    EmployeeHierarchySearchComponent.prototype.onGradeChange = function (jobRoleId) {
        var _this = this;
        this.designationService.getDesignationsByJobRoleId(jobRoleId)
            .subscribe(function (data) {
            _this.designations = data;
        });
    };
    EmployeeHierarchySearchComponent.prototype.search = function () {
        this.router.navigate(['employeeHierarchySearchResult'], {
            queryParams: {
                firstName: this.formGroupSearch.value.firstName,
                middleName: this.formGroupSearch.value.middleName,
                lastName: this.formGroupSearch.value.lastName,
                employeeId: this.formGroupSearch.value.employeeId,
                employmentType: this.formGroupSearch.value.empType,
                emailId: this.formGroupSearch.value.emailId,
                orgId: this.formGroupSearch.value.orgId,
                unitId: this.formGroupSearch.value.unitId,
                departmentId: this.formGroupSearch.value.departmentId,
                jobRoleId: this.formGroupSearch.value.jobRoleId,
                designationId: this.formGroupSearch.value.designationId,
                supervisorFlag: this.formGroupSearch.value.isSupervisor,
                hrFlag: this.formGroupSearch.value.isHr,
                supervisorEmailId: this.formGroupSearch.value.supervisorEmailId,
                hrEmailId: this.formGroupSearch.value.hrEmailId,
                sex: this.formGroupSearch.value.sex,
                identityDocTypeId: this.formGroupSearch.value.identityDocTypeId,
                identityNumber: this.formGroupSearch.value.identityDocNumber,
            }
        });
    };
    return EmployeeHierarchySearchComponent;
}());
EmployeeHierarchySearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-employee-hierarchy-search',
        template: __webpack_require__(479),
        styles: [__webpack_require__(463)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_9__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_organization_service__["a" /* OrganizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_organization_service__["a" /* OrganizationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_unit_service__["a" /* UnitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_unit_service__["a" /* UnitService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_department_service__["a" /* DepartmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_department_service__["a" /* DepartmentService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_doc_type_service__["a" /* DocTypeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_doc_type_service__["a" /* DocTypeService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__services_job_role_service__["a" /* JobRoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_job_role_service__["a" /* JobRoleService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__services_designation_service__["a" /* DesignationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_designation_service__["a" /* DesignationService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_employee_service__["a" /* EmployeeService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__angular_router__["a" /* Router */]) === "function" && _j || Object])
], EmployeeHierarchySearchComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=employee-hierarchy-search.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForbiddenAccessComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ForbiddenAccessComponent = (function () {
    function ForbiddenAccessComponent() {
    }
    ForbiddenAccessComponent.prototype.ngOnInit = function () {
    };
    return ForbiddenAccessComponent;
}());
ForbiddenAccessComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-forbidden-access',
        template: __webpack_require__(480),
        styles: [__webpack_require__(464)]
    }),
    __metadata("design:paramtypes", [])
], ForbiddenAccessComponent);

//# sourceMappingURL=forbidden-access.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        this.open = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__(481),
        styles: [__webpack_require__(465)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authenticator_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginFormComponent = (function () {
    function LoginFormComponent(formBuilder, router, authenticator) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.authenticator = authenticator;
        this.loginErrorMessage = 'inactive';
        this.processingInProgess = false;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem("accessToken")) {
            this.router.navigate(["home"]);
        }
        this.formGroup = this.formBuilder.group({
            username: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3)]],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
    };
    LoginFormComponent.prototype.onClick = function () {
        var _this = this;
        this.processingInProgess = true;
        this.authenticator.authenticate(this.formGroup.value)
            .subscribe(function (res) {
        }, function (err) {
            localStorage.clear();
            _this.loginErrorMessage = 'active';
            setTimeout(function () {
                if (_this.loginErrorMessage === 'active') {
                    _this.loginErrorMessage = 'inactive';
                }
            }, 3000);
            _this.processingInProgess = false;
        }, function () {
            _this.authenticator.setAuthenticationStatus(true);
            _this.router.navigate(['home']);
            _this.processingInProgess = false;
        });
    };
    LoginFormComponent.prototype.getLoginStatus = function () {
        return this.loginErrorMessage;
    };
    LoginFormComponent.prototype.isProcessingInProgress = function () {
        return this.processingInProgess;
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-login-form',
        template: __webpack_require__(482),
        styles: [__webpack_require__(466)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('heroState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({
                    height: '0',
                    paddingTop: '0',
                    paddingBottom: '0',
                    marginTop: '0',
                    marginBottom: '0',
                    visibility: 'hidden',
                    overflowY: 'hidden'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({})),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* transition */])('inactive => active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* animate */])('300ms ease-in')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* transition */])('active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* animate */])('300ms ease-out'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_authenticator_service__["a" /* AuthenticatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_authenticator_service__["a" /* AuthenticatorService */]) === "function" && _c || Object])
], LoginFormComponent);

var _a, _b, _c;
//# sourceMappingURL=login-form.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-not-found',
        template: __webpack_require__(483),
        styles: [__webpack_require__(467)]
    }),
    __metadata("design:paramtypes", [])
], NotFoundComponent);

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_employee_service__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeDetailsResolve; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeeDetailsResolve = (function () {
    function EmployeeDetailsResolve(employeeService) {
        this.employeeService = employeeService;
    }
    EmployeeDetailsResolve.prototype.resolve = function (route) {
        return this.employeeService.readDetails(route.paramMap.get('id'));
    };
    return EmployeeDetailsResolve;
}());
EmployeeDetailsResolve = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */]) === "function" && _a || Object])
], EmployeeDetailsResolve);

var _a;
//# sourceMappingURL=employee-details.resolve.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_employee_service__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeHierarchySearchResultResolve; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeeHierarchySearchResultResolve = (function () {
    function EmployeeHierarchySearchResultResolve(employeeService) {
        this.employeeService = employeeService;
        this.employeeSearchCriteria = { firstName: "", middleName: "", lastName: "", employeeId: "", employmentType: "", emailId: "", orgId: "", unitId: "", departmentId: "", jobRoleId: "", designationId: "", supervisorFlag: "", hrFlag: "", supervisorEmailId: "", hrEmailId: "", sex: "", identityDocTypeId: "", identityNumber: "" };
    }
    EmployeeHierarchySearchResultResolve.prototype.resolve = function (route) {
        this.employeeSearchCriteria.firstName = route.queryParamMap.get('firstName');
        this.employeeSearchCriteria.middleName = route.queryParamMap.get('middleName');
        this.employeeSearchCriteria.lastName = route.queryParamMap.get('lastName');
        this.employeeSearchCriteria.employeeId = route.queryParamMap.get('employeeId');
        this.employeeSearchCriteria.employmentType = route.queryParamMap.get('employmentType');
        this.employeeSearchCriteria.emailId = route.queryParamMap.get('emailId');
        this.employeeSearchCriteria.orgId = route.queryParamMap.get('orgId');
        this.employeeSearchCriteria.unitId = route.queryParamMap.get('unitId');
        this.employeeSearchCriteria.departmentId = route.queryParamMap.get('departmentId');
        this.employeeSearchCriteria.jobRoleId = route.queryParamMap.get('jobRoleId');
        this.employeeSearchCriteria.designationId = route.queryParamMap.get('designationId');
        this.employeeSearchCriteria.supervisorFlag = route.queryParamMap.get('supervisorFlag');
        this.employeeSearchCriteria.hrFlag = route.queryParamMap.get('hrFlag');
        this.employeeSearchCriteria.supervisorEmailId = route.queryParamMap.get('supervisorEmailId');
        this.employeeSearchCriteria.hrEmailId = route.queryParamMap.get('hrEmailId');
        this.employeeSearchCriteria.sex = route.queryParamMap.get('sex');
        this.employeeSearchCriteria.identityDocTypeId = route.queryParamMap.get('identityDocTypeId');
        this.employeeSearchCriteria.identityNumber = route.queryParamMap.get('identityNumber');
        return this.employeeService.search(this.employeeSearchCriteria);
    };
    return EmployeeHierarchySearchResultResolve;
}());
EmployeeHierarchySearchResultResolve = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */]) === "function" && _a || Object])
], EmployeeHierarchySearchResultResolve);

var _a;
//# sourceMappingURL=employee-hierarchy-search-result.resolve.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountService = (function () {
    function AccountService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    AccountService.prototype.getAccounts = function () {
        return this.httpService.callHttpGet("/resources/account")
            .map(function (res) { return res.json(); });
    };
    AccountService.prototype.modifyAccount = function (accountCode, account) {
        return this.httpService.callHttpPut("/resources/account/" + accountCode, account);
    };
    AccountService.prototype.createAccount = function (account) {
        return this.httpService.callHttpPost("/resources/account/", account);
    };
    AccountService.prototype.deleteAccount = function (accountCode) {
        return this.httpService.callHttpDelete("/resources/account/" + accountCode);
    };
    return AccountService;
}());
AccountService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], AccountService);

var _a, _b;
//# sourceMappingURL=account.service.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthguardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthguardService = (function () {
    function AuthguardService(router) {
        this.router = router;
    }
    AuthguardService.prototype.canActivate = function () {
        if (localStorage.getItem('accessToken')) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    return AuthguardService;
}());
AuthguardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], AuthguardService);

var _a;
//# sourceMappingURL=authguard.service.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanDeactivateGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CanDeactivateGuard = (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component) {
        console.log('Called!!');
        return component.canDeactivate ? component.canDeactivate() : true;
    };
    return CanDeactivateGuard;
}());
CanDeactivateGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], CanDeactivateGuard);

//# sourceMappingURL=can-deactivate-guard.service.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DesignationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DesignationService = (function () {
    function DesignationService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    DesignationService.prototype.getDesignationsByJobRoleId = function (jobRoleId) {
        return this.httpService.callHttpGet("/resources/v1/designation?jobRoleId=" + jobRoleId)
            .map(function (res) { return res.json(); });
    };
    return DesignationService;
}());
DesignationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], DesignationService);

var _a, _b;
//# sourceMappingURL=designation.service.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    UserService.prototype.changePassword = function (body) {
        return this.httpService.callHttpPost("/resources/v1/changepassword", body);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_employee_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_country_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_file_saver__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_file_saver__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UserDetailsComponent = (function () {
    function UserDetailsComponent(formBuilder, employeeService, activatedRoute, router, docTypeService, countryService) {
        this.formBuilder = formBuilder;
        this.employeeService = employeeService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.docTypeService = docTypeService;
        this.countryService = countryService;
        this.id = localStorage.getItem('userName');
        this.processingInProgress = false;
        this.showEditBasicInfo = false;
        this.selectedDocId = 0;
        this.selectedDocument = "about:blank";
        this.modalDisplay = false;
        this.showDocumentEdit = false;
        this.documentEditFunctionInvoked = false;
        this.showUpdateMessage = false;
    }
    UserDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeInfo = this.activatedRoute.snapshot.data['employeeInfo'];
        if (this.employeeInfo === undefined) {
            this.activatedRoute
                .queryParams
                .subscribe(function (params) {
                _this.processingInProgress = true;
                var employeeBasicInfoObservable = _this.employeeService.readDetails(_this.id)
                    .finally(function () { _this.processingInProgress = false; })
                    .subscribe(function (data) {
                    _this.employeeInfo = data;
                }, function (err) {
                    if (err.status === 401 && err.json()['message'] !== 'Refresh token expired') {
                        _this.router.navigate(['forbidden']);
                    }
                    if (err.status === 404) {
                        _this.router.navigate(['404']);
                    }
                }, function () {
                    _this.formGroupInitializer();
                });
            });
        }
        else {
            this.formGroupInitializer();
        }
    };
    UserDetailsComponent.prototype.formGroupInitializer = function () {
        this.formGroupBasicInfo = this.formBuilder.group({
            'title': [this.employeeInfo.employeeBasicInfo.title, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'empFirstName': [this.employeeInfo.employeeBasicInfo.empFirstName, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'empMiddleName': [this.employeeInfo.employeeBasicInfo.empMiddleName],
            'empLastName': [this.employeeInfo.employeeBasicInfo.empLastName, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'fatherName': [this.employeeInfo.employeeBasicInfo.fatherName],
            'dob': [this.employeeInfo.employeeBasicInfo.dob, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'emailId': [this.employeeInfo.employeeBasicInfo.emailId],
            'contactNo': [this.employeeInfo.employeeBasicInfo.contactNo, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'nationality': [this.employeeInfo.employeeBasicInfo.nationality, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'doj': [this.employeeInfo.employeeBasicInfo.doj],
            'organizationId': [this.employeeInfo.employeeBasicInfo.organizationId],
            'department': this.formBuilder.group({
                'departmentId': [this.employeeInfo.employeeBasicInfo.department.departmentId]
            }),
            'unit': this.formBuilder.group({
                'unitId': [this.employeeInfo.employeeBasicInfo.unit.unitId]
            }),
            'empType': [this.employeeInfo.employeeBasicInfo.empType, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'sex': [this.employeeInfo.employeeBasicInfo.sex, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'maritalStatus': [this.employeeInfo.employeeBasicInfo.maritalStatus, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'identityDocType': this.formBuilder.group({
                'docTypeId': [this.employeeInfo.employeeBasicInfo.identityDocType.docTypeId, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required]
            }),
            'identityNumber': [this.employeeInfo.employeeBasicInfo.identityNumber, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required],
            'hrFlag': [this.employeeInfo.employeeBasicInfo.hrFlag],
            'supervisorFlag': [this.employeeInfo.employeeBasicInfo.supervisorFlag]
        });
        this.formGroupDocument = this.formBuilder.group({
            'docId': [""],
            'docTypeId': [""],
            'remarks': [""],
            'document': [""],
            'documentName': [""]
        });
    };
    UserDetailsComponent.prototype.profileImageUpload = function (event) {
        var reader = new FileReader();
        reader.readAsDataURL(event.srcElement.files[0]);
        var me = this;
        reader.onload = function () {
            var fileContent = reader.result;
            me.processingInProgress = true;
            me.employeeService.uploadProfileImage(me.id, { 'profileImage': fileContent })
                .finally(function () {
                me.processingInProgress = false;
            })
                .subscribe(function (data) {
            }, function (err) {
                if (err.status === 401 && err.json()['message'] !== 'Refresh token expired') {
                    me.router.navigate(['forbidden']);
                }
                if (err.status === 404) {
                    me.router.navigate(['404']);
                }
            }, function () {
                me.employeeInfo.employeeBasicInfo.profileImage = fileContent;
                me.showUpdateMessage = true;
            });
        };
    };
    UserDetailsComponent.prototype.editBasicInfo = function () {
        var _this = this;
        if (this.identityDocTypes === undefined) {
            var docTypeServiceObservable = this.docTypeService.getIdentityDocTypes();
            var countryServiceObservable = this.countryService.getCountries();
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([docTypeServiceObservable, countryServiceObservable])
                .finally(function () { _this.processingInProgress = false; })
                .subscribe(function (data) {
                _this.identityDocTypes = data[0];
                _this.countries = data[1];
            }, function (err) {
                if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                    _this.router.navigate(['forbidden']);
                }
                if (err.status === 404) {
                    _this.router.navigate(['404']);
                }
            }, function () {
                _this.showEditBasicInfo = true;
                _this.modalDisplay = true;
            });
        }
        else {
            this.showEditBasicInfo = true;
            this.modalDisplay = true;
        }
    };
    UserDetailsComponent.prototype.getShowEditBasicInfo = function () {
        return this.showEditBasicInfo;
    };
    UserDetailsComponent.prototype.onBasicInfoUpdate = function () {
        var _this = this;
        this.processingInProgress = true;
        this.employeeService.updateBasicInfo(this.id, this.formGroupBasicInfo.value)
            .finally(function () {
            _this.processingInProgress = false;
            _this.showEditBasicInfo = false;
        })
            .subscribe(function (data) {
        }, function (err) {
            if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                _this.router.navigate(['forbidden']);
            }
            if (err.status === 404) {
                _this.router.navigate(['404']);
            }
        }, function () {
            _this.employeeInfo.employeeBasicInfo = Object.assign(_this.employeeInfo.employeeBasicInfo, _this.formGroupBasicInfo.value);
        });
    };
    UserDetailsComponent.prototype.getSelectedDocId = function () {
        return this.selectedDocId;
    };
    UserDetailsComponent.prototype.setSelectedDocId = function (docId) {
        var _this = this;
        this.selectedDocId = docId;
        this.employeeService.getDocument(docId, this.id)
            .subscribe(function (data) {
            if ((navigator.appVersion.indexOf("MSIE") !== -1) || (!!window["MSInputMethodContext"] && !!document["documentMode"])) {
                var abc = data.document.split(',')[1].replace(/\s/g, '');
                var byteString = atob(abc);
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([ia], { type: 'application/pdf' });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_file_saver__["saveAs"])(blob, "hrmsdocument.pdf");
                _this.selectedDocument = "hrmsdocument.pdf";
            }
            else {
                _this.selectedDocDetails = data;
                _this.selectedDocument = data.document;
            }
        }, function (err) {
        });
    };
    UserDetailsComponent.prototype.closeAllDialog = function (event) {
        if (event === null || event.undefined || event.currentTarget === event.target) {
            this.showEditBasicInfo = false;
            this.modalDisplay = false;
            this.showDocumentEdit = false;
            this.documentEditFunctionInvoked = false;
        }
    };
    UserDetailsComponent.prototype.handleKeyboardEvent = function (event) {
        if (event.keyCode === 27) {
            this.closeAllDialog(null);
        }
    };
    UserDetailsComponent.prototype.editDocument = function () {
        var _this = this;
        if (this.docTypes === undefined && this.selectedDocDetails !== undefined) {
            var docTypeServiceObservable = this.docTypeService.getDocTypes()
                .finally(function () { _this.processingInProgress = false; })
                .subscribe(function (data) {
                _this.docTypes = data;
            }, function (err) {
                if (err.status === 401 && err.json()["message"] !== "Refresh token expired") {
                    _this.router.navigate(['forbidden']);
                }
                if (err.status === 404) {
                    _this.router.navigate(['404']);
                }
            }, function () {
                _this.showDocumentEdit = true;
                _this.modalDisplay = true;
                _this.initializeDocumentEditForm();
            });
        }
        else if (this.selectedDocDetails !== undefined) {
            this.showDocumentEdit = true;
            this.modalDisplay = true;
            this.initializeDocumentEditForm();
        }
        else {
            this.documentEditFunctionInvoked = true;
        }
    };
    UserDetailsComponent.prototype.initializeDocumentEditForm = function () {
        this.formGroupDocument.setValue({
            'docId': this.selectedDocDetails.docId,
            'docTypeId': this.selectedDocDetails.docTypeId,
            'remarks': this.selectedDocDetails.remarks,
            'document': this.selectedDocDetails.document,
            'documentName': ""
        });
    };
    UserDetailsComponent.prototype.addDocument = function () {
    };
    UserDetailsComponent.prototype.getShowDocumentEdit = function () {
        return this.showDocumentEdit;
    };
    UserDetailsComponent.prototype.onDocumentUpdate = function () {
        var _this = this;
        this.processingInProgress = true;
        this.employeeService.documentSave(this.formGroupDocument.value, this.id)
            .finally(function () {
            _this.processingInProgress = false;
            _this.closeAllDialog(null);
        })
            .subscribe(function (res) {
            _this.selectedDocument = _this.formGroupDocument.value.document;
            console.log(_this.formGroupDocument.value.document);
        }, function (err) {
        }, function () {
        });
    };
    UserDetailsComponent.prototype.documentUpload = function (event) {
        console.log(event);
        this.formGroupDocument.controls['documentName'].setValue(event.srcElement.files[0].name);
        var reader = new FileReader();
        reader.readAsDataURL(event.srcElement.files[0]);
        var me = this;
        reader.onload = function () {
            me.formGroupDocument.controls['document'].setValue(reader.result);
        };
    };
    UserDetailsComponent.prototype.getShowSelectDocumentAlert = function () {
        if (this.selectedDocDetails === undefined && this.documentEditFunctionInvoked) {
            return true;
        }
        else {
            return false;
        }
    };
    UserDetailsComponent.prototype.onCancel = function () {
        this.showEditBasicInfo = false;
    };
    UserDetailsComponent.prototype.isProcessingInProgress = function () {
        return this.processingInProgress;
    };
    UserDetailsComponent.prototype.getShowUpdateMessage = function () {
        return this.showUpdateMessage;
    };
    UserDetailsComponent.prototype.onClickUpdateMessageOk = function () {
        this.showUpdateMessage = false;
    };
    return UserDetailsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('document:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserDetailsComponent.prototype, "handleKeyboardEvent", null);
UserDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-user-details',
        template: __webpack_require__(486),
        styles: [__webpack_require__(470)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_doc_type_service__["a" /* DocTypeService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_country_service__["a" /* CountryService */]) === "function" && _f || Object])
], UserDetailsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=user-details.component.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authenticator_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HttpService = (function () {
    function HttpService(http, authenticatorService, router) {
        this.http = http;
        this.authenticatorService = authenticatorService;
        this.router = router;
    }
    HttpService.prototype.callHttpGet = function (url) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var me = this;
        return this.http.get(url, options)
            .catch(function (initialError) {
            if (initialError && initialError.status === 401 && initialError.json()["message"] === "Token expired") {
                // token might be expired, try to refresh token
                var tokenObject = new Object();
                tokenObject["token"] = localStorage.getItem("refreshToken");
                return me.authenticatorService.authenticate(tokenObject)
                    .flatMap(function (res) {
                    var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
                    var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
                    return me.http.get(url, options);
                })
                    .catch(function (error) {
                    if (error && error.status === 401 && error.json()["message"] === "Refresh token expired") {
                        _this.router.navigate(['']);
                        localStorage.clear();
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(initialError);
            }
        });
    };
    HttpService.prototype.callHttpPut = function (url, body) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var me = this;
        return this.http.put(url, body, options)
            .catch(function (initialError) {
            if (initialError && initialError.status === 401 && initialError.json()["message"] === "Token expired") {
                // token might be expired, try to refresh token
                var tokenObject = new Object();
                tokenObject["token"] = localStorage.getItem("refreshToken");
                return me.authenticatorService.authenticate(tokenObject)
                    .flatMap(function (res) {
                    var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
                    var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
                    return me.http.put(url, body, options);
                })
                    .catch(function (error) {
                    if (error && error.status === 401 && error.json()["message"] === "Refresh token expired") {
                        localStorage.clear();
                        _this.router.navigate(['']);
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(initialError);
            }
        });
    };
    HttpService.prototype.callHttpDelete = function (url) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var me = this;
        return this.http.delete(url, options)
            .catch(function (initialError) {
            if (initialError && initialError.status === 401 && initialError.json()["message"] === "Token expired") {
                // token might be expired, try to refresh token
                var tokenObject = new Object();
                tokenObject["token"] = localStorage.getItem("refreshToken");
                return me.authenticatorService.authenticate(tokenObject)
                    .flatMap(function (res) {
                    var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
                    var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
                    return me.http.delete(url, options);
                })
                    .catch(function (error) {
                    if (error && error.status === 401 && error.json()["message"] === "Refresh token expired") {
                        localStorage.clear();
                        _this.router.navigate(['']);
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(initialError);
            }
        });
    };
    HttpService.prototype.callHttpPost = function (url, body) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var me = this;
        return this.http.post(url, body, options)
            .catch(function (initialError) {
            if (initialError && initialError.status === 401 && initialError.json()["message"] === "Token expired") {
                // token might be expired, try to refresh token
                var tokenObject = new Object();
                tokenObject["token"] = localStorage.getItem("refreshToken");
                return me.authenticatorService.authenticate(tokenObject)
                    .flatMap(function (res) {
                    var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
                    var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
                    return me.http.post(url, body, options);
                })
                    .catch(function (error) {
                    if (error && error.status === 401 && error.json()["message"] === "Refresh token expired") {
                        localStorage.clear();
                        _this.router.navigate(['']);
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                    }
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(initialError);
            }
        });
    };
    return HttpService;
}());
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__authenticator_service__["a" /* AuthenticatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__authenticator_service__["a" /* AuthenticatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */]) === "function" && _c || Object])
], HttpService);

var _a, _b, _c;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ic_camera_alt_black_24px.3e8be2cb2e9714e05a3a.svg";

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ic_create_white_24px.efdf25049d0b474da898.svg";

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_EmptyObservable__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_EmptyObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_EmptyObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EmployeeService = (function () {
    function EmployeeService(httpService, http, router) {
        this.httpService = httpService;
        this.http = http;
        this.router = router;
    }
    EmployeeService.prototype.handleError = function (response) {
        if (response.status === 401 && response.json()["message"] !== "Refresh token expired") {
            this.router.navigate(['forbidden']);
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(response);
        ;
    };
    EmployeeService.prototype.autoComplete = function (name, value) {
        if (value.trim().length === 0 || name.trim().length === 0) {
            return new __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_EmptyObservable__["EmptyObservable"]();
        }
        return this.httpService.callHttpGet("/resources/v1/employee/management/autocomplete?attributeName=" + name + "&attributeValuePrefix=" + value)
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.create = function (employee) {
        return this.httpService.callHttpPost("/resources/v1/employee/management", employee);
    };
    EmployeeService.prototype.search = function (employeeSearchCriteria) {
        var _this = this;
        return this.httpService.callHttpGet("/resources/v1/employee/management"
            + "?firstName=" + (employeeSearchCriteria.firstName ? employeeSearchCriteria.firstName : "")
            + "&middleName=" + (employeeSearchCriteria.middleName ? employeeSearchCriteria.middleName : "")
            + "&lastName=" + (employeeSearchCriteria.lastName ? employeeSearchCriteria.lastName : "")
            + "&employeeId=" + (employeeSearchCriteria.employeeId ? employeeSearchCriteria.employeeId : "")
            + "&employeeType=" + (employeeSearchCriteria.employmentType ? employeeSearchCriteria.employmentType : "")
            + "&emailId=" + (employeeSearchCriteria.emailId ? employeeSearchCriteria.emailId : "")
            + "&orgId=" + (employeeSearchCriteria.orgId ? employeeSearchCriteria.orgId : "")
            + "&unitId=" + (employeeSearchCriteria.unitId ? employeeSearchCriteria.unitId : "")
            + "&departmentId=" + (employeeSearchCriteria.departmentId ? employeeSearchCriteria.departmentId : "")
            + "&jobRoleId=" + (employeeSearchCriteria.jobRoleId ? employeeSearchCriteria.jobRoleId : "")
            + "&designationId=" + (employeeSearchCriteria.designationId ? employeeSearchCriteria.designationId : "")
            + "&supervisorFlag=" + (employeeSearchCriteria.supervisorFlag ? employeeSearchCriteria.supervisorFlag : "")
            + "&hrFlag=" + (employeeSearchCriteria.hrFlag ? employeeSearchCriteria.hrFlag : "")
            + "&supervisorEmailId=" + (employeeSearchCriteria.supervisorEmailId ? employeeSearchCriteria.supervisorEmailId : "")
            + "&hrEmailId=" + (employeeSearchCriteria.hrEmailId ? employeeSearchCriteria.hrEmailId : "")
            + "&sex=" + (employeeSearchCriteria.sex ? employeeSearchCriteria.sex : "")
            + "&maritalStatus=" + (employeeSearchCriteria.maritalStatus ? employeeSearchCriteria.maritalStatus : "")
            + "&identityDocTypeId=" + (employeeSearchCriteria.identityDocTypeId ? employeeSearchCriteria.identityDocTypeId : "")
            + "&identityNumber=" + (employeeSearchCriteria.identityNumber ? employeeSearchCriteria.identityNumber : ""))
            .map(function (res) { return res.json(); })
            .catch(function (response) {
            return _this.handleError(response);
        });
    };
    EmployeeService.prototype.readDetails = function (employeeId) {
        var _this = this;
        return this.httpService.callHttpGet("/resources/v1/employee/management/" + employeeId)
            .map(function (res) { return res.json(); })
            .catch(function (response) {
            return _this.handleError(response);
        });
    };
    EmployeeService.prototype.uploadProfileImage = function (employeeId, reqBody) {
        return this.httpService.callHttpPut("/resources/v1/employee/management/" + employeeId + "/image", reqBody)
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.updateBasicInfo = function (employeeId, reqBody) {
        return this.httpService.callHttpPut("/resources/v1/employee/management/" + employeeId + "/basicinfo", reqBody)
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.getDocument = function (docId, employeeId) {
        var _this = this;
        return this.httpService.callHttpGet("/resources/v1/employee/management/" + employeeId + "/document/" + docId)
            .map(function (res) { return res.json(); })
            .catch(function (response) {
            return _this.handleError(response);
        });
    };
    EmployeeService.prototype.documentSave = function (doc, employeeId) {
        return this.httpService.callHttpPut("/resources/v1/employee/management/" + employeeId + "/document/" + doc.docId, doc)
            .map(function (res) { return res.json(); });
    };
    return EmployeeService;
}());
EmployeeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* Router */]) === "function" && _c || Object])
], EmployeeService);

var _a, _b, _c;
//# sourceMappingURL=employee.service.js.map

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 288;


/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(304);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(473),
        styles: [__webpack_require__(457)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_form_login_form_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_authenticator_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_account_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_college_service__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_employee_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_department_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_organization_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_unit_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_doc_type_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_job_role_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_designation_service__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_authguard_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser_animations__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__home_home_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__side_bar_side_bar_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__spinner_spinner_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__account_management_account_management_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__employee_creation_employee_creation_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__not_found_not_found_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__forbidden_access_forbidden_access_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__employee_hierarchy_search_employee_hierarchy_search_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_country_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__employee_hierarchy_search_result_employee_hierarchy_search_result_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_district_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_state_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__employee_details_employee_details_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__date_picker_date_picker_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__user_details_user_details_component__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__resolvers_employee_details_resolve__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__resolvers_employee_hierarchy_search_result_resolve__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__employee_creation_new_employee_creation_new_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__services_can_deactivate_guard_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pipes_safe_pipe__ = __webpack_require__(300);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__login_form_login_form_component__["a" /* LoginFormComponent */],
            __WEBPACK_IMPORTED_MODULE_21__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_22__side_bar_side_bar_component__["a" /* SideBarComponent */],
            __WEBPACK_IMPORTED_MODULE_23__spinner_spinner_component__["a" /* SpinnerComponent */],
            __WEBPACK_IMPORTED_MODULE_24__account_management_account_management_component__["a" /* AccountManagementComponent */],
            __WEBPACK_IMPORTED_MODULE_25__employee_creation_employee_creation_component__["a" /* EmployeeCreationComponent */],
            __WEBPACK_IMPORTED_MODULE_26__not_found_not_found_component__["a" /* NotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_27__forbidden_access_forbidden_access_component__["a" /* ForbiddenAccessComponent */],
            __WEBPACK_IMPORTED_MODULE_28__employee_hierarchy_search_employee_hierarchy_search_component__["a" /* EmployeeHierarchySearchComponent */],
            __WEBPACK_IMPORTED_MODULE_30__employee_hierarchy_search_result_employee_hierarchy_search_result_component__["a" /* EmployeeHierarchySearchResultComponent */],
            __WEBPACK_IMPORTED_MODULE_33__employee_details_employee_details_component__["a" /* EmployeeDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_34__date_picker_date_picker_component__["a" /* DatePickerComponent */],
            __WEBPACK_IMPORTED_MODULE_35__user_details_user_details_component__["a" /* UserDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_38__employee_creation_new_employee_creation_new_component__["a" /* EmployeeCreationNewComponent */],
            __WEBPACK_IMPORTED_MODULE_40__pipes_safe_pipe__["a" /* SafePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__services_authenticator_service__["a" /* AuthenticatorService */],
            __WEBPACK_IMPORTED_MODULE_9__services_account_service__["a" /* AccountService */],
            __WEBPACK_IMPORTED_MODULE_10__services_college_service__["a" /* CollegeService */],
            __WEBPACK_IMPORTED_MODULE_11__services_employee_service__["a" /* EmployeeService */],
            __WEBPACK_IMPORTED_MODULE_12__services_department_service__["a" /* DepartmentService */],
            __WEBPACK_IMPORTED_MODULE_17__services_designation_service__["a" /* DesignationService */],
            __WEBPACK_IMPORTED_MODULE_18__services_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_19__services_authguard_service__["a" /* AuthguardService */],
            __WEBPACK_IMPORTED_MODULE_13__services_organization_service__["a" /* OrganizationService */],
            __WEBPACK_IMPORTED_MODULE_14__services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_15__services_doc_type_service__["a" /* DocTypeService */],
            __WEBPACK_IMPORTED_MODULE_16__services_job_role_service__["a" /* JobRoleService */],
            __WEBPACK_IMPORTED_MODULE_29__services_country_service__["a" /* CountryService */],
            __WEBPACK_IMPORTED_MODULE_32__services_state_service__["a" /* StateService */],
            __WEBPACK_IMPORTED_MODULE_31__services_district_service__["a" /* DistrictService */],
            __WEBPACK_IMPORTED_MODULE_36__resolvers_employee_details_resolve__["a" /* EmployeeDetailsResolve */],
            __WEBPACK_IMPORTED_MODULE_37__resolvers_employee_hierarchy_search_result_resolve__["a" /* EmployeeHierarchySearchResultResolve */],
            __WEBPACK_IMPORTED_MODULE_39__services_can_deactivate_guard_service__["a" /* CanDeactivateGuard */],
            { provide: "windowObject", useValue: window }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_form_login_form_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_management_account_management_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__employee_hierarchy_search_employee_hierarchy_search_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__employee_hierarchy_search_result_employee_hierarchy_search_result_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__employee_details_employee_details_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__employee_creation_employee_creation_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__employee_creation_new_employee_creation_new_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_details_user_details_component__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__not_found_not_found_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__forbidden_access_forbidden_access_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_authguard_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_can_deactivate_guard_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__resolvers_employee_details_resolve__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__resolvers_employee_hierarchy_search_result_resolve__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
















var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot([
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__login_form_login_form_component__["a" /* LoginFormComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
    { path: 'accountManagement', component: __WEBPACK_IMPORTED_MODULE_3__account_management_account_management_component__["a" /* AccountManagementComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
    { path: 'employeeHierarchySearch', component: __WEBPACK_IMPORTED_MODULE_4__employee_hierarchy_search_employee_hierarchy_search_component__["a" /* EmployeeHierarchySearchComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
    { path: 'employeeHierarchySearchResult', component: __WEBPACK_IMPORTED_MODULE_5__employee_hierarchy_search_result_employee_hierarchy_search_result_component__["a" /* EmployeeHierarchySearchResultComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]], resolve: { searchResult: __WEBPACK_IMPORTED_MODULE_15__resolvers_employee_hierarchy_search_result_resolve__["a" /* EmployeeHierarchySearchResultResolve */] } },
    { path: 'employeeDetails/:id', component: __WEBPACK_IMPORTED_MODULE_6__employee_details_employee_details_component__["a" /* EmployeeDetailsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]], resolve: { employeeInfo: __WEBPACK_IMPORTED_MODULE_14__resolvers_employee_details_resolve__["a" /* EmployeeDetailsResolve */] } },
    { path: 'employeeCreation', component: __WEBPACK_IMPORTED_MODULE_7__employee_creation_employee_creation_component__["a" /* EmployeeCreationComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]], canDeactivate: [__WEBPACK_IMPORTED_MODULE_13__services_can_deactivate_guard_service__["a" /* CanDeactivateGuard */]] },
    { path: 'employeeCreationNew', component: __WEBPACK_IMPORTED_MODULE_8__employee_creation_new_employee_creation_new_component__["a" /* EmployeeCreationNewComponent */] },
    { path: 'userDetails', component: __WEBPACK_IMPORTED_MODULE_9__user_details_user_details_component__["a" /* UserDetailsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
    { path: 'forbidden', component: __WEBPACK_IMPORTED_MODULE_11__forbidden_access_forbidden_access_component__["a" /* ForbiddenAccessComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
    { path: '404', component: __WEBPACK_IMPORTED_MODULE_10__not_found_not_found_component__["a" /* NotFoundComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
    { path: '**', redirectTo: '/404', canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_authguard_service__["a" /* AuthguardService */]] },
]);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* unused harmony export DateModel */
/* unused harmony export DatePickerOptions */
/* unused harmony export CALENDAR_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePickerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var Moment = __WEBPACK_IMPORTED_MODULE_2_moment__["default"] || __WEBPACK_IMPORTED_MODULE_2_moment__;
var DateModel = (function () {
    function DateModel(obj) {
        this.day = obj && obj.day ? obj.day : null;
        this.month = obj && obj.month ? obj.month : null;
        this.year = obj && obj.year ? obj.year : null;
        this.formatted = obj && obj.formatted ? obj.formatted : null;
        this.momentObj = obj && obj.momentObj ? obj.momentObj : null;
    }
    return DateModel;
}());

var DatePickerOptions = (function () {
    function DatePickerOptions(obj) {
        this.autoApply = (obj && obj.autoApply === true) ? true : false;
        this.style = obj && obj.style ? obj.style : 'normal';
        this.locale = obj && obj.locale ? obj.locale : 'en';
        this.minDate = obj && obj.minDate ? obj.minDate : null;
        this.maxDate = obj && obj.maxDate ? obj.maxDate : null;
        this.initialDate = obj && obj.initialDate ? obj.initialDate : null;
        this.firstWeekdaySunday = obj && obj.firstWeekdaySunday ? obj.firstWeekdaySunday : true;
        this.format = obj && obj.format ? obj.format : 'DD/MM/YYYY';
        this.selectYearText = obj && obj.selectYearText ? obj.selectYearText : 'Select Year';
        this.todayText = obj && obj.todayText ? obj.todayText : 'Today';
        this.clearText = obj && obj.clearText ? obj.clearText : 'Clear';
    }
    return DatePickerOptions;
}());

var CALENDAR_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* forwardRef */])(function () { return DatePickerComponent; }),
    multi: true
};
var DatePickerComponent = (function () {
    function DatePickerComponent(el) {
        var _this = this;
        this.el = el;
        this.top = 40;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.opened = false;
        this.currentDate = Moment();
        this.options = this.options || {};
        this.days = [];
        this.years = [];
        this.date = new DateModel({
            day: null,
            month: null,
            year: null,
            formatted: null,
            momentObj: null
        });
        this.outputEvents = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        if (!this.inputEvents) {
            return;
        }
        this.inputEvents.subscribe(function (event) {
            if (event.type === 'setDate') {
                _this.value = event.data;
            }
            else if (event.type === 'default') {
                if (event.data === 'open') {
                    _this.open();
                }
                else if (event.data === 'close') {
                    _this.close();
                }
            }
        });
    }
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        get: function () {
            return this.date;
        },
        set: function (date) {
            if (!date) {
                return;
            }
            this.date = date;
            this.onChangeCallback(date);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = new DatePickerOptions(this.options);
        this.scrollOptions = {
            barBackground: '#C9C9C9',
            barWidth: '7',
            gridBackground: '#C9C9C9',
            gridWidth: '2'
        };
        if (this.options.initialDate instanceof Date) {
            this.currentDate = Moment(this.options.initialDate);
            this.selectDate(null, this.currentDate);
        }
        if (this.options.minDate instanceof Date) {
            this.minDate = Moment(this.options.minDate);
        }
        else {
            this.minDate = null;
        }
        if (this.options.maxDate instanceof Date) {
            this.maxDate = Moment(this.options.maxDate);
        }
        else {
            this.maxDate = null;
        }
        this.generateYears();
        this.generateCalendar();
        this.outputEvents.emit({ type: 'default', data: 'init' });
        if (typeof window !== 'undefined') {
            var body = document.querySelector('body');
            body.addEventListener('click', function (e) {
                if (!_this.opened || !e.target) {
                    return;
                }
                ;
                if (_this.el.nativeElement !== e.target && !_this.el.nativeElement.contains(e.target)) {
                    _this.close();
                }
            }, false);
        }
        if (this.inputEvents) {
            this.inputEvents.subscribe(function (e) {
                if (e.type === 'action') {
                    if (e.data === 'toggle') {
                        _this.toggle();
                    }
                    if (e.data === 'close') {
                        _this.close();
                    }
                    if (e.data === 'open') {
                        _this.open();
                    }
                }
                if (e.type === 'setDate') {
                    if (!(e.data instanceof Date)) {
                        throw new Error("Input data must be an instance of Date!");
                    }
                    var date = Moment(e.data);
                    if (!date) {
                        throw new Error("Invalid date: " + e.data);
                    }
                    _this.value = {
                        day: date.format('DD'),
                        month: date.format('MM'),
                        year: date.format('YYYY'),
                        formatted: date.format(_this.options.format),
                        momentObj: date
                    };
                }
            });
        }
    };
    DatePickerComponent.prototype.generateCalendar = function () {
        var date = Moment(this.currentDate);
        var month = date.month();
        var year = date.year();
        var n = 1;
        var firstWeekDay = (this.options.firstWeekdaySunday) ? date.date(2).day() : date.date(1).day();
        if (firstWeekDay !== 1) {
            n -= (firstWeekDay + 6) % 7;
        }
        this.days = [];
        var selectedDate = this.date.momentObj;
        for (var i = n; i <= date.endOf('month').date(); i += 1) {
            var currentDate = Moment(i + "." + (month + 1) + "." + year, 'DD.MM.YYYY');
            var today = (Moment().isSame(currentDate, 'day') && Moment().isSame(currentDate, 'month')) ? true : false;
            var selected = (selectedDate && selectedDate.isSame(currentDate, 'day')) ? true : false;
            var betweenMinMax = true;
            if (this.minDate !== null) {
                if (this.maxDate !== null) {
                    betweenMinMax = currentDate.isBetween(this.minDate, this.maxDate, 'day', '[]') ? true : false;
                }
                else {
                    betweenMinMax = currentDate.isBefore(this.minDate, 'day') ? false : true;
                }
            }
            else {
                if (this.maxDate !== null) {
                    betweenMinMax = currentDate.isAfter(this.maxDate, 'day') ? false : true;
                }
            }
            var day = {
                day: i > 0 ? i : null,
                month: i > 0 ? month : null,
                year: i > 0 ? year : null,
                enabled: i > 0 ? betweenMinMax : false,
                today: i > 0 && today ? true : false,
                selected: i > 0 && selected ? true : false,
                momentObj: currentDate
            };
            this.days.push(day);
        }
    };
    DatePickerComponent.prototype.selectDate = function (e, date) {
        var _this = this;
        if (e) {
            e.preventDefault();
        }
        setTimeout(function () {
            _this.value = {
                day: date.format('DD'),
                month: date.format('MM'),
                year: date.format('YYYY'),
                formatted: date.format(_this.options.format),
                momentObj: date
            };
            _this.generateCalendar();
            _this.outputEvents.emit({ type: 'dateChanged', data: _this.value });
        });
        this.opened = false;
    };
    DatePickerComponent.prototype.selectYear = function (e, year) {
        var _this = this;
        e.preventDefault();
        setTimeout(function () {
            var date = _this.currentDate.year(year);
            _this.value = {
                day: date.format('DD'),
                month: date.format('MM'),
                year: date.format('YYYY'),
                formatted: date.format(_this.options.format),
                momentObj: date
            };
            _this.yearPicker = false;
            _this.generateCalendar();
        });
    };
    DatePickerComponent.prototype.generateYears = function () {
        var date = this.minDate || Moment().year(Moment().year() - 40);
        var toDate = this.maxDate || Moment().year(Moment().year() + 40);
        var years = toDate.year() - date.year();
        for (var i = 0; i < years; i++) {
            this.years.push(date.year());
            date.add(1, 'year');
        }
    };
    DatePickerComponent.prototype.writeValue = function (date) {
        if (!date) {
            return;
        }
        this.date = date;
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DatePickerComponent.prototype.prevMonth = function () {
        this.currentDate = this.currentDate.subtract(1, 'month');
        this.generateCalendar();
    };
    DatePickerComponent.prototype.nextMonth = function () {
        this.currentDate = this.currentDate.add(1, 'month');
        this.generateCalendar();
    };
    DatePickerComponent.prototype.today = function () {
        this.currentDate = Moment();
        this.selectDate(null, this.currentDate);
    };
    DatePickerComponent.prototype.toggle = function () {
        if (!this.opened) {
            var boundingRect = this.datePickerContainer.nativeElement.getBoundingClientRect();
            if (window.innerHeight <= boundingRect.bottom + 400) {
                this.top = window.innerHeight - 400;
            }
            else {
                this.top = boundingRect.top + 40;
            }
        }
        this.opened = !this.opened;
        if (this.opened) {
            this.onOpen();
        }
        this.outputEvents.emit({ type: 'default', data: 'opened' });
    };
    DatePickerComponent.prototype.open = function () {
        this.opened = true;
        this.onOpen();
    };
    DatePickerComponent.prototype.close = function () {
        this.opened = false;
        this.outputEvents.emit({ type: 'default', data: 'closed' });
    };
    DatePickerComponent.prototype.onOpen = function () {
        this.yearPicker = false;
    };
    DatePickerComponent.prototype.openYearPicker = function () {
        var _this = this;
        setTimeout(function () { return _this.yearPicker = true; });
    };
    DatePickerComponent.prototype.clear = function () {
        this.value = { day: null, month: null, year: null, momentObj: null, formatted: null };
        this.close();
        this.outputEvents.emit({ type: 'clear', data: 'closed' });
    };
    return DatePickerComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('datePickerContainer'),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "datePickerContainer", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", DatePickerOptions)
], DatePickerComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], DatePickerComponent.prototype, "inputEvents", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _b || Object)
], DatePickerComponent.prototype, "outputEvents", void 0);
DatePickerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'date-picker',
        template: __webpack_require__(474),
        styles: [__webpack_require__(458)],
        providers: [CALENDAR_VALUE_ACCESSOR],
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */])),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _c || Object])
], DatePickerComponent);

var _a, _b, _c;
//# sourceMappingURL=date-picker.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SafePipe;
}());
SafePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Pipe */])({ name: 'safe' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["d" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["d" /* DomSanitizer */]) === "function" && _a || Object])
], SafePipe);

var _a;
//# sourceMappingURL=safe.pipe.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollegeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CollegeService = (function () {
    function CollegeService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    CollegeService.prototype.getColleges = function () {
        return this.httpService.callHttpGet("/resources/college")
            .map(function (res) { return res.json(); });
    };
    return CollegeService;
}());
CollegeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], CollegeService);

var _a, _b;
//# sourceMappingURL=college.service.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authenticator_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_custom_validators__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SideBarComponent = (function () {
    function SideBarComponent(router, authenticatorService, formBuilder, userService) {
        this.router = router;
        this.authenticatorService = authenticatorService;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.processingInProgess = false;
        this.open = false;
        this.showChangePassword = false;
        this.changePasswordMessage = '';
        this.showLogoutMessage = false;
    }
    SideBarComponent.prototype.keyboardInput = function (event) {
        console.log("" + event.keyCode);
        if (event.keyCode === 77 && event.ctrlKey && !this.open) {
            this.changeClass();
        }
        else if (event.keyCode === 27 && this.open === true) {
            this.changeClass();
        }
    };
    SideBarComponent.prototype.ngOnInit = function () {
        this.createFormGroup();
    };
    SideBarComponent.prototype.createFormGroup = function () {
        this.formGroup = this.formBuilder.group({
            currentPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_custom_validators__["a" /* CustomValidator */].noSpace])],
            newPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_4__validators_custom_validators__["a" /* CustomValidator */].noSpace])],
            confirmedPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].minLength(6)])]
        }, {
            validator: this.matchingPasswords
        });
    };
    SideBarComponent.prototype.matchingPasswords = function (group) {
        var password = group.controls['newPassword'];
        var confirmPassword = group.controls['confirmedPassword'];
        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ matchingPasswords: true });
        }
        return null;
    };
    SideBarComponent.prototype.changeClass = function () {
        if (this.open === false) {
            this.open = true;
            this.showChangePassword = false;
        }
        else
            this.open = false;
    };
    SideBarComponent.prototype.getOpen = function () {
        return this.open;
    };
    SideBarComponent.prototype.onClickParameter = function () {
        window.scrollTo(0, 0);
        this.router.navigate(['parameter']);
        this.open = false;
    };
    SideBarComponent.prototype.goHome = function () {
        window.scrollTo(0, 0);
        this.router.navigate(['home']);
        this.open = false;
    };
    SideBarComponent.prototype.logout = function () {
        this.processingInProgess = true;
        this.authenticatorService.logout();
        this.processingInProgess = false;
        this.router.navigate(['']);
    };
    SideBarComponent.prototype.isAuthorized = function (permission) {
        return this.authenticatorService.isAuthorized(permission);
    };
    SideBarComponent.prototype.getUserName = function () {
        return localStorage.getItem("userDisplayName") + " (" + localStorage.getItem("userName") + ")";
    };
    SideBarComponent.prototype.onClickChangePassword = function () {
        this.open = false;
        this.showChangePassword = true;
        this.createFormGroup();
    };
    SideBarComponent.prototype.getShowChangePassword = function () {
        return this.showChangePassword;
    };
    SideBarComponent.prototype.isProcessingInProgress = function () {
        return this.processingInProgess;
    };
    SideBarComponent.prototype.onCancelChangePassword = function () {
        this.showChangePassword = false;
    };
    SideBarComponent.prototype.onClickAccountMgmt = function () {
        window.scrollTo(0, 0);
        this.router.navigate(['accountManagement']);
        this.open = false;
    };
    SideBarComponent.prototype.onClickEmployeeHierarchySearch = function () {
        window.scrollTo(0, 0);
        this.router.navigate(['employeeHierarchySearch']);
        this.open = false;
    };
    SideBarComponent.prototype.onClickEmployeeCreation = function () {
        window.scrollTo(0, 0);
        this.router.navigate(['employeeCreation']);
        this.open = false;
    };
    SideBarComponent.prototype.onClickUserDetails = function () {
        window.scrollTo(0, 0);
        this.router.navigate(['userDetails']);
        this.open = false;
    };
    SideBarComponent.prototype.onChangePassword = function () {
        var _this = this;
        this.processingInProgess = true;
        this.userService.changePassword(this.formGroup.value)
            .subscribe(function (res) {
            _this.processingInProgess = false;
            _this.changePasswordMessage = "Password changed successfully";
            _this.showChangePassword = false;
        }, function (err) {
            _this.changePasswordMessage = err.json()["message"];
            _this.processingInProgess = false;
            _this.showChangePassword = false;
        });
    };
    SideBarComponent.prototype.OnClickOk = function () {
        this.changePasswordMessage = '';
    };
    SideBarComponent.prototype.getErrorClass = function (formControlName) {
        if (this.formGroup.controls[formControlName].invalid && this.formGroup.controls[formControlName].touched)
            return ["error-bar"];
        else
            return ["bar"];
    };
    SideBarComponent.prototype.isFieldValueMissing = function (formControlName) {
        if (this.formGroup.controls[formControlName].hasError('required') && this.formGroup.controls[formControlName].touched)
            return true;
        else
            return false;
    };
    SideBarComponent.prototype.isConfirmedPasswordNotMatching = function () {
        if (this.formGroup.controls['newPassword'].valid && this.formGroup.controls['confirmedPassword'].touched
            && this.formGroup.controls['confirmedPassword'].invalid) {
            return true;
        }
        else
            return false;
    };
    SideBarComponent.prototype.isValueInvalid = function (formControlName) {
        if (this.formGroup.controls[formControlName].invalid && !this.isFieldValueMissing(formControlName) && this.formGroup.controls[formControlName].touched) {
            return true;
        }
        else {
            return false;
        }
    };
    SideBarComponent.prototype.getShowLogoutMessage = function () {
        return this.showLogoutMessage;
    };
    SideBarComponent.prototype.onClickLogout = function () {
        this.open = false;
        this.showLogoutMessage = true;
    };
    SideBarComponent.prototype.onCancelLogout = function () {
        this.showLogoutMessage = false;
    };
    return SideBarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* HostListener */])('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SideBarComponent.prototype, "keyboardInput", null);
SideBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-side-bar',
        template: __webpack_require__(484),
        styles: [__webpack_require__(468)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_authenticator_service__["a" /* AuthenticatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authenticator_service__["a" /* AuthenticatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _d || Object])
], SideBarComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=side-bar.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SpinnerComponent = (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent.prototype.ngOnInit = function () {
    };
    return SpinnerComponent;
}());
SpinnerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-spinner',
        template: __webpack_require__(485),
        styles: [__webpack_require__(469)]
    })
], SpinnerComponent);

//# sourceMappingURL=spinner.component.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocTypeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DocTypeService = (function () {
    function DocTypeService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    DocTypeService.prototype.getIdentityDocTypes = function () {
        return this.httpService.callHttpGet("/resources/v1/doctype/identitydoctype")
            .map(function (res) { return res.json(); });
    };
    DocTypeService.prototype.getDocTypes = function () {
        return this.httpService.callHttpGet("/resources/v1/doctype")
            .map(function (res) { return res.json(); });
    };
    return DocTypeService;
}());
DocTypeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], DocTypeService);

var _a, _b;
//# sourceMappingURL=doc-type.service.js.map

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".datepicker-container {\r\n\tposition: relative;\r\n    float: right;\r\n    margin-top: -30px;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container {\r\n\tdisplay: inline-block;\r\n\tbackground: transparent;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input {\r\n\tdisplay: inline-block;\r\n\twidth: 160px;\r\n\tmargin-right: 10px;\r\n\tborder: none;\r\n\toutline: none;\r\n\tborder-bottom: 1px solid #ced4da;\r\n\tfont-size: 14px;\r\n\tcolor: #000000;\r\n\ttext-align: center;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input::-webkit-input-placeholder {\r\n\tcolor: #343a40;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input::-moz-placeholder {\r\n\tcolor: #343a40;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input:-ms-input-placeholder {\r\n\tcolor: #343a40;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input:-moz-placeholder {\r\n\tcolor: #343a40;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input-icon {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input-icon i {\r\n\tcursor: pointer;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input-icon i svg {\r\n\twidth: 15px;\r\n\theight: 15px;\r\n}\r\n\r\n.datepicker-container .datepicker-input-container .datepicker-input-icon i svg g g {\r\n\tfill: #000000;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar {\r\n\t-webkit-touch-callout: none;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\twidth: 250px;\r\n\ttop: 40px;\r\n\tposition: absolute;\r\n\tz-index: 99;\r\n\tbackground: #FFFFFF;\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-bottom-right-radius: 4px;\r\n\tbox-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top {\r\n\twidth: 100%;\r\n\theight: 80px;\r\n\tbackground: #4ca1af;\r\n\tdisplay: inline-block;\r\n\tposition: relative;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top .year-title {\r\n\tdisplay: block;\r\n\tmargin-top: 12px;\r\n\tcolor: #FFFFFF;\r\n\tfont-size: 28px;\r\n\ttext-align: center;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top button {\r\n\twidth: 200px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\tdisplay: block;\r\n\tmargin: 0 auto;\r\n\tcolor: #FFFFFF;\r\n\ttext-transform: uppercase;\r\n\tbackground: transparent;\r\n\tborder: none;\r\n\toutline: none;\r\n\tfont-size: 12px;\r\n\tcursor: pointer;\r\n\tposition: relative;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg {\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\twidth: 15px;\r\n\theight: 15px;\r\n\tposition: absolute;\r\n\ttop: 2px;\r\n\tleft: 12px;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg g {\r\n\tfill: #FFFFFF;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg g path {\r\n\tfill: #FFFFFF;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top .close {\r\n\tposition: absolute;\r\n\ttop: 5px;\r\n\tright: 5px;\r\n\tfont-size: 20px;\r\n\tcolor: #FFFFFF;\r\n\tcursor: pointer;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top .close svg {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-top .close svg g path {\r\n\tfill: #FFFFFF;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container {\r\n\tdisplay: inline-block;\r\n\twidth: 100%;\r\n\tpadding: 10px;\r\n\tbackground: #fff;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section {\r\n\twidth: 100%;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-pack: justify;\r\n\t    -ms-flex-pack: justify;\r\n\t        justify-content: space-between;\r\n\tfont-size: 14px;\r\n\tcolor: #4ca1af;\r\n\ttext-transform: uppercase;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i {\r\n\tcursor: pointer;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:first-child {\r\n\tmargin-left: 12px;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:last-child {\r\n\tmargin-right: 12px;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names {\r\n\twidth: 230px;\r\n\tmargin-top: 10px;\r\n\tdisplay: inline-block;\r\n\tborder: 1px solid transparent;\r\n    color: #4ca1af;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names span {\r\n\tfont-size: 12px;\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\twidth: calc(100% / 7);\r\n\ttext-align: center;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container {\r\n\twidth: 230px;\r\n\tmargin-top: 5px;\r\n\tdisplay: inline-block;\r\n\tborder: 1px solid transparent;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-pack: center;\r\n\t    -ms-flex-pack: center;\r\n\t        justify-content: center;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n\tfloat: left;\r\n\tfont-size: 14px;\r\n\tcolor: #4ca1af;\r\n\twidth: calc(100% / 7);\r\n\theight: 33px;\r\n\ttext-align: center;\r\n\tborder-radius: 50%;\r\n\tcursor: pointer;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day:hover:not(.disabled), .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.selected {\r\n\tbackground: #4ca1af;\r\n\tborder: 1px solid #4ca1af;\r\n\tborder-radius: 4px;\r\n\tcolor: #fff;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.disabled {\r\n\tpointer-events: none;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.today {\r\n\tcolor: #4ca1af;\r\n    border-radius: 50%;\r\n    border-style: solid;\r\n    border-width: 1px;\r\n    background-color: #fff;\r\n\tborder-color:#4ca1af;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container {\r\n\twidth: 100%;\r\n\theight: 240px;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-pack: center;\r\n\t    -ms-flex-pack: center;\r\n\t        justify-content: center;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n\tfloat: left;\r\n\tfont-size: 14px;\r\n\tcolor: #4ca1af;\r\n\twidth: calc(100% / 4);\r\n\theight: 50px;\r\n\ttext-align: center;\r\n\tborder-radius: 50%;\r\n\tcursor: pointer;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year:hover, .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year.selected {\r\n\tbackground: #4ca1af;\r\n\tborder: 1px solid #4ca1af;\r\n\tborder-radius: 4px;\r\n\tcolor: #fff;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons {\r\n\twidth: 235px;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-pack: center;\r\n\t    -ms-flex-pack: center;\r\n\t        justify-content: center;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button {\r\n\twidth: 100%;\r\n\toutline: none;\r\n\tdisplay: inline-block;\r\n\tborder: 1px solid #4ca1af;\r\n\tbackground: #099268;\r\n\tcolor: #fff;\r\n\tmargin-right: 5px;\r\n\tborder-radius: 5px;\r\n\tcursor: pointer;\r\n\ttext-align: center;\r\n\tpadding: 5px 10px;\r\n\tborder-radius: 4px;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-primary {\r\n\tbackground: #4ca1af;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-primary:active {\r\n\tbackground: #4ca1af;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary {\r\n\tbackground: #fff;\r\n\tcolor: #4ca1af;\r\n}\r\n\r\n.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:active {\r\n\tbackground: #fff;\r\n\tcolor: #4ca1af;\r\n}\r\n\r\n/*.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:hover {\r\n\tcolor: #fff;\r\n}*/\r\n\r\n.datepicker-container svg {\r\n\tdisplay: block;\r\n\twidth: 20px;\r\n\theight: 20px;\r\n}\r\n\r\n.datepicker-container svg g {\r\n\tfill: #4ca1af;\r\n}\r\n\r\n.datepicker-container svg g g {\r\n\tfill: #4ca1af;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".display-table {\r\n   display: table;\r\n   width: 100%;\r\n   table-layout: fixed;\r\n}\r\n\r\n.table-cell {\r\n  padding: 6px 12px;\r\n  display: table-cell;\r\n  border-color: #fff;\r\n  border-width: 0 1px 1px 1px;\r\n  border-style: solid;\r\n  color: black;\r\n} \r\n\r\n.grouped {\r\n  border-top: 1px; \r\n  border-style: solid; \r\n  border-color: rgba(76, 161, 175, 0.8); \r\n  border-radius: 6px;\r\n} \r\n\r\n.internalLabel {\r\n    display: inline-block;\r\n    width: 100%;\r\n    padding: 12px 1.5rem;\r\n    margin: 1em 0;\r\n    color:rgba(76, 161, 175, 0.8); \r\n    font-size: 14px;\r\n    font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\n.row {\r\n  display: table-row;\r\n}\r\n\r\n.table .row {\r\n  background: #E3EEFF;\r\n}\r\n\r\n.table .row:nth-child(1) {\r\n  background-color: #4ca1af;\r\n  color: #fff;\r\n}\r\n\r\n.table .row:hover {\r\n  background: #E3EEFF;  \r\n}\r\n\r\n.table .row:nth-child(1):hover {\r\n  background: #4ca1af;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".display-table {\r\n   display: table;\r\n   width: 100%;\r\n   table-layout: fixed;\r\n}\r\n\r\n.table-cell {\r\n  padding: 6px 12px;\r\n  display: table-cell;\r\n  border-color: #fff;\r\n  border-width: 0 1px 1px 1px;\r\n  border-style: solid;\r\n  color: black;\r\n} \r\n\r\n.grouped {\r\n  border-top: 1px; \r\n  border-style: solid; \r\n  border-color: rgba(76, 161, 175, 0.8); \r\n  border-radius: 6px;\r\n} \r\n\r\n.internalLabel {\r\n    display: inline-block;\r\n    width: 100%;\r\n    padding: 12px 1.5rem;\r\n    margin: 1em 0;\r\n    color:rgba(76, 161, 175, 0.8); \r\n    font-size: 14px;\r\n    font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\n.row {\r\n  display: table-row;\r\n}\r\n\r\n.table .row {\r\n  background: #E3EEFF;\r\n}\r\n\r\n.table .row:nth-child(1) {\r\n  background-color: #4ca1af;\r\n  color: #fff;\r\n}\r\n\r\n.table .row:hover {\r\n  background: #E3EEFF;  \r\n}\r\n\r\n.table .row:nth-child(1):hover {\r\n  background: #4ca1af;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".profile-bg {\r\n    width: 100%;\r\n    top:90px;\r\n    position: relative;\r\n    padding: 0;\r\n    height: 280px;\r\n    background: url(\"/assets/img/profilebg-min.jpg\") no-repeat center bottom fixed;\r\n    background-size: cover;\r\n    overflow: auto;\r\n}\r\n\r\n.profile-bg:before {\r\n    content: '';\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tbackground-image: linear-gradient(to bottom right, #0F6177, #c0392b);\r\n\topacity: .6; \r\n}\r\n\r\n.profile-pic-container {\r\n    position: absolute;\r\n    width: 185px;\r\n    height: 185px;\r\n    left: 160px;\r\n    top: 140px;\r\n    z-index: 9;\r\n}\r\n\r\n.custom-file-upload {\r\n    position: inherit;\r\n    bottom: 11px;\r\n    right: 11px;\r\n    z-index: 6;\r\n    background: url(" + __webpack_require__(161) + ") no-repeat;\r\n    width: 73px;\r\n    height: 27px;\r\n    border: 2px solid gray;\r\n    border-top-left-radius: 6px;\r\n    color: black;\r\n    text-align: right;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 0.9rem;\r\n    padding: 3px;\r\n    background-color: gray;\r\n    cursor: pointer;\r\n    opacity: 0.7;\r\n}\r\n\r\n.profile-pic-container:hover .profile-pic {\r\n  opacity: 0.7;\r\n}\r\n\r\n.profile-pic-container:hover .custom-file-upload {\r\n  opacity: 1;\r\n}\r\n\r\n.profile-pic {\r\n    position: inherit;\r\n    width: 180px;\r\n    height: 180px;\r\n    /*left: 160px;\r\n    top: 140px;*/\r\n    z-index: 5;\r\n    opacity: 1;\r\n    border-width: 5px;\r\n    border-color: #fff;\r\n    border-style: solid;\r\n}\r\n\r\n.profile-pic {\r\n    cursor: pointer;\r\n}\r\n\r\n.name-header {\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 2rem;\r\n    text-align: left;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}\r\n\r\n.name-sub-header {\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 1rem;\r\n    text-align: left;\r\n    padding-left: 8rem;\r\n    padding-bottom: 0.5rem;\r\n}\r\n\r\n.profile-header {\r\n    position: absolute;\r\n    left: 270px;\r\n    top: 40px;\r\n    z-index: 5;    \r\n}\r\n\r\n.edit-btn {\r\n    top: 320px;\r\n    background: url(" + __webpack_require__(162) + ") no-repeat 13px center;\r\n    width:50px;\r\n    height: 50px;\r\n    border-radius:100%;\r\n    color:#fff;\r\n    text-align: center;\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    border-bottom: none; \r\n    background-color: #4ca1af;\r\n    text-decoration: none;\r\n    z-index: 24;\r\n}\r\n.edit-btn > .material-icons{font-size:20px;}\r\n\r\n.edit-btn-fixed {\r\n    position: absolute;\r\n    right: 10px;\r\n}\r\n\r\n\r\n.create-btn{\r\n    top: 400px;\r\n    background: url(\"/assets/img/ic_add_white_24px.svg\") no-repeat 13px center;\r\n    width:50px;\r\n    height: 50px;\r\n    border-radius:100%;\r\n    color:#fff;\r\n    text-align: center;\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    border-bottom: none; \r\n    background-color: #4ca1af;\r\n    text-decoration: none;\r\n    z-index: 24;\r\n}\r\n.create-btn > .material-icons{font-size:20px;}\r\n\r\n.create-btn-fixed {\r\n  position: absolute;\r\n  right: 10px;\r\n}\r\n\r\nli {\r\n    width: 100%;\r\n    height: 100px;\r\n    max-height: 100px;\r\n    list-style: none;\r\n    border-bottom: 1px solid #4ca1af;\r\n    padding: 10px 20px;\r\n}\r\n\r\nli:hover {\r\n    border-left: 3px solid #4ca1af;\r\n    background-color: #E3EEFF;\r\n}\r\n\r\nh2 {\r\n    font-size: 14px;\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.document-height {\r\n    height: 80vh;\r\n    overflow: auto;\r\n}\r\n\r\n.selectedDocument {\r\n    background-color: #E3EEFF;\r\n}\r\n\r\n.display-table .display-table {\r\n    padding: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".heroimage {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: url(\"/assets/img/forbidden-min.jpg\") no-repeat center center fixed;\r\n    background-size: cover;\r\n    overflow: auto;\r\n    -webkit-filter: blur(5px) brightness(0.7);\r\n            filter: blur(5px) brightness(0.7);\r\n}\r\n\r\n.herotext {\r\n    position: absolute;\r\n    top: 5rem;\r\n    left: 5rem;\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 3rem;\r\n    text-align: left;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}\r\n\r\n.heroparagraphs {\r\n    position: absolute;\r\n    top: 10rem;\r\n    left: 5rem;\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 1rem;\r\n    text-align: left;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".herotext {\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 3rem;\r\n    text-align: center;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}\r\n\r\n.zainlogo {\r\n    border-radius: 25px;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -10%);\r\n            transform: translate(-50%, -10%);\r\n    height: 15rem;\r\n    width: 30rem;\r\n    \r\n}\r\n\r\n.home-background {\r\n  background: linear-gradient(to right, #4ca1af , #C4E0E5);\r\n}\r\n\r\n.body {\r\n  background-color: #fff;\r\n  height: 100%;\r\n  left: 70px;\r\n  position: fixed;\r\n  top: 0px;\r\n  width: calc(100% - 70px);\r\n  padding-top: 40px;\r\n}\r\n\r\n.page-header {\r\n  width: 100%;\r\n  left: 70px;\r\n  top: 0;\r\n  color: #fff;\r\n  background-color: #4ca1af;\r\n  padding: 40px;\r\n  display: block;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".heroimage {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: url(\"/assets/img/loginimage-min.jpg\") no-repeat center center fixed;\r\n    background-size: cover;\r\n    overflow: auto;\r\n}\r\n\r\n.login {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    width: 30rem;\r\n    height: 25rem;\r\n    overflow: hidden;  \r\n    background: linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);\r\n    transition: opacity 0.1s, -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);\r\n    transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);\r\n    transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25), -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);\r\n    border-radius: 10px;\r\n}\r\n\r\n.loginform {\r\n  position: absolute;\r\n  top: 30%;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 50%;\r\n  padding: 1.5rem 2.5rem;\r\n  text-align: center;\r\n}\r\n.loginrow {\r\n  height: 4rem;\r\n  padding-top: 1rem;\r\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\r\n}\r\n.logininput {\r\n  display: inline-block;\r\n  width: 24rem;\r\n  height: 100%;\r\n  font-size: 1.5rem;\r\n  background: transparent;\r\n  color: #FDFCFD;\r\n}\r\n.loginsubmit {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 3rem;\r\n  margin: 3rem 0 2.2rem;\r\n  color: rgba(255, 255, 255, 0.8);\r\n  /*background: #FF3366;*/\r\n  background: #00abd6;\r\n  font-size: 1.5rem;\r\n  border-radius: 3rem;\r\n  cursor: pointer;\r\n  overflow: hidden;\r\n  transition: width 0.3s 0.15s, font-size 0.1s 0.15s;\r\n}\r\n\r\n.loginsubmit:hover {\r\n    opacity: 0.9;\r\n}\r\n\r\n::-webkit-input-placeholder {\r\n      color: rgba(255, 255, 255, 0.8);\r\n}\r\n\r\n:-ms-input-placeholder {\r\n      color: rgba(255, 255, 255, 0.8);\r\n}\r\n\r\n::placeholder {\r\n      color: rgba(255, 255, 255, 0.8);\r\n}\r\n\r\ninput:-webkit-autofill,\r\ninput:-webkit-autofill:hover,\r\ninput:-webkit-autofill:focus,\r\ninput:-webkit-autofill:active {\r\n    transition: background-color 5000s ease-in-out 0s;\r\n    -webkit-text-fill-color: white !important;\r\n}\r\n\r\n\r\n.alert {\r\n  display: inline-block;\r\n  height: 4rem;\r\n  width: 30rem;\r\n  padding: 1.5rem 7.5rem;\r\n  margin: 0;\r\n  background: #f2dede;\r\n  color: #a94442;\r\n  border-radius: 10px;\r\n}\r\n\r\n.herotext {\r\n    position:absolute;\r\n    top: 15%;\r\n    height: 4rem;\r\n    color: white;\r\n    padding: 1.5rem 2.5rem;\r\n    font-size: 1.5rem;\r\n    text-align: center;\r\n    opacity: 0.5;\r\n    font-family: ElMessiri-Regular;\r\n}\r\n\r\napp-spinner {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".heroimage {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: url(\"/assets/img/notfound-min.jpg\") no-repeat center center fixed;\r\n    background-size: cover;\r\n    overflow: auto;\r\n    -webkit-filter: brightness(0.7);\r\n            filter: brightness(0.7);\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.herotext {\r\n    position: absolute;\r\n    top: 5rem;\r\n    left: 5rem;\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 3rem;\r\n    text-align: left;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}\r\n\r\n.heroparagraphs {\r\n    position: absolute;\r\n    top: 12rem;\r\n    left: 5rem;\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 1rem;\r\n    text-align: left;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "a {\r\n  color: #fff;\r\n}\r\n\r\n.sidebar {\r\n    background-color: #0F6177;\r\n    height: 100vh;\r\n    left: 0;\r\n    position: fixed;\r\n    top: 0;\r\n    transition: width 0.5s;\r\n    width: 70px;\r\n    z-index: 30;\r\n}\r\n\r\n.sidebar:after {\r\n  content: \"\";\r\n  border: 1px solid #fff;\r\n  height: 100%;\r\n  position:absolute;\r\n  left: 70px;\r\n}\r\n\r\n.menu {\r\n  position:absolute;\r\n  top: 90px;\r\n  width: 0;\r\n  opacity: 0;\r\n  left: 90px;\r\n  z-index: 30;\r\n  padding-bottom: 150px;\r\n}\r\n\r\n.show-menu {\r\n  -webkit-animation: show-menu-animation;\r\n          animation: show-menu-animation;\r\n  width: 60rem;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-duration: 0.5s;\r\n          animation-duration: 0.5s;\r\n  margin: 0;\r\n}\r\n\r\n@-webkit-keyframes show-menu-animation {\r\n  0% {\r\n    opacity: 0;\r\n    left: 0rem;\r\n  }\r\n  50% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    left: 3rem;\r\n  }\r\n}\r\n\r\n@keyframes show-menu-animation {\r\n  0% {\r\n    opacity: 0;\r\n    left: 0rem;\r\n  }\r\n  50% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    left: 3rem;\r\n  }\r\n}\r\n\r\n.username {\r\n  color: #fff;\r\n  padding-bottom: 5px;\r\n  text-align: right;\r\n}\r\n\r\n.change-password {\r\n  position: relative;\r\n  color: white;\r\n  padding: 8px;\r\n  font-size: 12px;\r\n  cursor: pointer;\r\n  letter-spacing: 1px;\r\n  word-spacing: 4px;\r\n  text-align: right;  \r\n}\r\n\r\n.menu-header {\r\n  color: white;\r\n  font-size: 20px;\r\n  text-align: left;\r\n  color: #4ca1af;\r\n  border-bottom: solid 1px #4ca1af;\r\n  padding-top: 15px;\r\n}\r\n\r\n.menu-subheader {\r\n  color: white;\r\n  padding-bottom: 1.2rem;\r\n  font-size: 20px;\r\n}\r\n\r\n.menu-item {\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  position: relative;\r\n  color: white;\r\n  padding: 4px 0;\r\n  display: inline-block;\r\n  font-size: 12px;\r\n  cursor: pointer;\r\n  letter-spacing: 1px;\r\n  word-spacing: 4px;\r\n  text-decoration: none;\r\n}\r\n\r\n.menu li {\r\n  list-style-type: none;\r\n}\r\n\r\n.menu-item:after {\r\n  padding-top: 2px;\r\n  display:block;\r\n  content: '';\r\n  border-bottom: solid 1px #fff;  \r\n  -webkit-transform: scaleX(0);  \r\n          transform: scaleX(0);  \r\n  transition: -webkit-transform 250ms ease-in-out;  \r\n  transition: transform 250ms ease-in-out;  \r\n  transition: transform 250ms ease-in-out, -webkit-transform 250ms ease-in-out;\r\n}\r\n\r\n.menu-item:hover:after { -webkit-transform: scaleX(1); transform: scaleX(1); }\r\n\r\n.menu-icon {\r\n  top: 2rem;\r\n  width: 60px;\r\n  height: 45px;\r\n  position: absolute;\r\n  transition: .5s ease-in-out;\r\n  cursor: pointer;\r\n  -webkit-transform: rotate(0deg) scale(0.5) translateX(-50%);\r\n          transform: rotate(0deg) scale(0.5) translateX(-50%);\r\n  left: 18px;\r\n}\r\n\r\n.menu-icon span {\r\n  display: block;\r\n  position: absolute;\r\n  height: 4px;\r\n  width: 100%;\r\n  background: white;\r\n  border-radius: 9px;\r\n  opacity: 1;\r\n  left: 0;\r\n  -webkit-transform: rotate(0deg);\r\n          transform: rotate(0deg);\r\n  transition: .25s ease-in-out;\r\n}\r\n\r\n.menu-icon span:nth-child(1) {\r\n  top: 0px;\r\n  -webkit-transform-origin: left center;\r\n          transform-origin: left center;\r\n}\r\n\r\n.menu-icon span:nth-child(2) {\r\n  top: 18px;\r\n  -webkit-transform-origin: left center;\r\n          transform-origin: left center;\r\n}\r\n\r\n.menu-icon span:nth-child(3) {\r\n  top: 36px;\r\n  -webkit-transform-origin: left center;\r\n          transform-origin: left center;\r\n}\r\n\r\n.menu-icon.open span:nth-child(1) {\r\n  -webkit-transform: rotate(45deg);\r\n          transform: rotate(45deg);\r\n  top: -3px;\r\n  left: 8px;\r\n}\r\n\r\n.menu-icon.open span:nth-child(2) {\r\n  width: 0%;\r\n  opacity: 0;\r\n}\r\n\r\n.menu-icon.open span:nth-child(3) {\r\n  -webkit-transform: rotate(-45deg);\r\n          transform: rotate(-45deg);\r\n  top: 39px;\r\n  left: 8px;\r\n}\r\n\r\n.sidebar-open {\r\n    width: 60rem;\r\n}\r\n\r\n.sidebar-row {\r\n    max-width: 40rem;\r\n    margin: 0 auto 0 8rem;\r\n    width:100%;\r\n}\r\n\r\n.home-icon {\r\n  top: 15rem;\r\n  left: 22px;\r\n  -webkit-transform: scale(0.7) translateX(-50%);\r\n          transform: scale(0.7) translateX(-50%);\r\n  width: 60px;\r\n  height: 45px;\r\n  position: absolute;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  margin: 20px 10px;\r\n}\r\n\r\n.span1 {\r\n  height:40px; \r\n  width:40px; \r\n  display:block; \r\n  position:relative;\r\n} \r\n\r\n.span1:before {\r\n  content:''; \r\n  height:10px; \r\n  width:5px; \r\n  display:block; \r\n  position:absolute; \r\n  top:6px; \r\n  left:28px; \r\n  background:#fff;\r\n}\r\n\r\n.span1:after {\r\n  content:''; \r\n  height:24px; \r\n  width:23px; \r\n  border-top:4px #fff solid; \r\n  border-right:4px #fff solid; \r\n  position:absolute; \r\n  top:8px; \r\n  left:7px; \r\n  -webkit-transform:scale(1,0.8) rotate(-45deg); \r\n          transform:scale(1,0.8) rotate(-45deg);\r\n}\r\n\r\n.span2 { \r\n  width:29px; \r\n  height:20px; \r\n  display:block; \r\n  position:absolute; \r\n  top:18px; \r\n  left:6px; \r\n  border:4px solid #fff; \r\n  border-width:0 4px;}\r\n\r\n.span2:before {\r\n  content:''; \r\n  height:4px; \r\n  width:4px; \r\n  display:block; \r\n  position:absolute; \r\n  top:6px; \r\n  left:6px; \r\n  background:#fff; \r\n  box-shadow:5px 0 0 #fff, 0 5px 0 #fff, 5px 5px 0 #fff;}\r\n\r\n\r\n.logout-icon {\r\n  top: 18rem;\r\n  left: 25px;\r\n  -webkit-transform: scale(0.7) translateX(-50%);\r\n          transform: scale(0.7) translateX(-50%);\r\n  width: 60px;\r\n  height: 45px;\r\n  position: absolute;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  margin: 20px 10px;  \r\n}\r\n\r\n.span3 {\r\n  display:block; \r\n  position:relative; \r\n} \r\n\r\n.span3 {\r\n  height:35px; \r\n  width:35px; \r\n  border:3px #fff solid; \r\n  border-radius:100%;\r\n}\r\n\r\n.span3:before {\r\n  content:''; \r\n  left: 7px; \r\n  top: 7px;\r\n  height:15px; \r\n  width:15px; \r\n  background:#fff; \r\n  border-radius:100%; \r\n  position:absolute; \r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".loader,\r\n.loader:after {\r\n  border-radius: 50%;\r\n  width: 10em;\r\n  height: 10em;\r\n}\r\n.loader {\r\n  margin: 60px auto;\r\n  font-size: 10px;\r\n  position: relative;\r\n  text-indent: -9999em;\r\n  border-top: 1.1em solid rgba(196,224,229, 0.2);\r\n  border-right: 1.1em solid rgba(196,224,229, 0.2);\r\n  border-bottom: 1.1em solid rgba(196,224,229, 0.2);\r\n  border-left: 1.1em solid #c4e0e5;\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-animation: load8 1.1s infinite linear;\r\n  animation: load8 1.1s infinite linear;\r\n}\r\n@-webkit-keyframes load8 {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n@keyframes load8 {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".profile-bg {\r\n    width: 100%;\r\n    top:90px;\r\n    position: relative;\r\n    padding: 0;\r\n    height: 280px;\r\n    background: url(\"/assets/img/profilebg-min.jpg\") no-repeat center bottom fixed;\r\n    background-size: cover;\r\n    overflow: auto;\r\n}\r\n\r\n.profile-bg:before {\r\n    content: '';\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tbackground-image: linear-gradient(to bottom right, #0F6177, #c0392b);\r\n\topacity: .6; \r\n}\r\n\r\n.profile-pic-container {\r\n    position: absolute;\r\n    width: 185px;\r\n    height: 185px;\r\n    left: 160px;\r\n    top: 140px;\r\n    z-index: 9;\r\n}\r\n\r\n.custom-file-upload {\r\n    position: inherit;\r\n    bottom: 11px;\r\n    right: 11px;\r\n    z-index: 6;\r\n    background: url(" + __webpack_require__(161) + ") no-repeat;\r\n    width: 73px;\r\n    height: 27px;\r\n    border: 2px solid gray;\r\n    border-top-left-radius: 6px;\r\n    color: black;\r\n    text-align: right;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 0.9rem;\r\n    padding: 3px;\r\n    background-color: gray;\r\n    cursor: pointer;\r\n    opacity: 0.7;\r\n}\r\n\r\n.profile-pic-container:hover .profile-pic {\r\n  opacity: 0.7;\r\n}\r\n\r\n.profile-pic-container:hover .custom-file-upload {\r\n  opacity: 1;\r\n}\r\n\r\n.profile-pic {\r\n    position: inherit;\r\n    width: 180px;\r\n    height: 180px;\r\n    /*left: 160px;\r\n    top: 140px;*/\r\n    z-index: 5;\r\n    opacity: 1;\r\n    border-width: 5px;\r\n    border-color: #fff;\r\n    border-style: solid;\r\n}\r\n\r\n.profile-pic {\r\n    cursor: pointer;\r\n}\r\n\r\n.name-header {\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 2rem;\r\n    text-align: left;\r\n    padding: 6rem 8rem 2rem 8rem;\r\n}\r\n\r\n.name-sub-header {\r\n    color: #fff;\r\n    font-family: ElMessiri-Regular;\r\n    font-size: 1rem;\r\n    text-align: left;\r\n    padding-left: 8rem;\r\n    padding-bottom: 0.5rem;\r\n}\r\n\r\n.profile-header {\r\n    position: absolute;\r\n    left: 270px;\r\n    top: 40px;\r\n    z-index: 5;    \r\n}\r\n\r\n.edit-btn {\r\n    top: 320px;\r\n    background: url(" + __webpack_require__(162) + ") no-repeat 13px center;\r\n    width:50px;\r\n    height: 50px;\r\n    border-radius:100%;\r\n    color:#fff;\r\n    text-align: center;\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    border-bottom: none; \r\n    background-color: #4ca1af;\r\n    text-decoration: none;\r\n    z-index: 24;\r\n}\r\n.edit-btn > .material-icons{font-size:20px;}\r\n\r\n.edit-btn-fixed {\r\n    position: absolute;\r\n    right: 10px;\r\n}\r\n\r\n.create-btn{\r\n    top: 400px;\r\n    background: url(\"/assets/img/ic_add_white_24px.svg\") no-repeat 13px center;\r\n    width:50px;\r\n    height: 50px;\r\n    border-radius:100%;\r\n    color:#fff;\r\n    text-align: center;\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    border-bottom: none; \r\n    background-color: #4ca1af;\r\n    text-decoration: none;\r\n    z-index: 24;\r\n}\r\n.create-btn > .material-icons{font-size:20px;}\r\n\r\n.create-btn-fixed {\r\n  position: absolute;\r\n  right: 10px;\r\n}\r\n\r\nli {\r\n    width: 100%;\r\n    height: 100px;\r\n    max-height: 100px;\r\n    list-style: none;\r\n    border-bottom: 1px solid #4ca1af;\r\n    padding: 10px 20px;\r\n}\r\n\r\nli:hover {\r\n    border-left: 3px solid #4ca1af;\r\n    background-color: #E3EEFF;\r\n}\r\n\r\nh2 {\r\n    font-size: 14px;\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.document-height {\r\n    height: 80vh;\r\n    overflow: auto;\r\n}\r\n\r\n.selectedDocument {\r\n    background-color: #E3EEFF;\r\n}\r\n\r\n.display-table .display-table {\r\n    padding: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 164,
	"./af.js": 164,
	"./ar": 170,
	"./ar-dz": 165,
	"./ar-dz.js": 165,
	"./ar-ly": 166,
	"./ar-ly.js": 166,
	"./ar-ma": 167,
	"./ar-ma.js": 167,
	"./ar-sa": 168,
	"./ar-sa.js": 168,
	"./ar-tn": 169,
	"./ar-tn.js": 169,
	"./ar.js": 170,
	"./az": 171,
	"./az.js": 171,
	"./be": 172,
	"./be.js": 172,
	"./bg": 173,
	"./bg.js": 173,
	"./bn": 174,
	"./bn.js": 174,
	"./bo": 175,
	"./bo.js": 175,
	"./br": 176,
	"./br.js": 176,
	"./bs": 177,
	"./bs.js": 177,
	"./ca": 178,
	"./ca.js": 178,
	"./cs": 179,
	"./cs.js": 179,
	"./cv": 180,
	"./cv.js": 180,
	"./cy": 181,
	"./cy.js": 181,
	"./da": 182,
	"./da.js": 182,
	"./de": 184,
	"./de-at": 183,
	"./de-at.js": 183,
	"./de.js": 184,
	"./dv": 185,
	"./dv.js": 185,
	"./el": 186,
	"./el.js": 186,
	"./en-au": 187,
	"./en-au.js": 187,
	"./en-ca": 188,
	"./en-ca.js": 188,
	"./en-gb": 189,
	"./en-gb.js": 189,
	"./en-ie": 190,
	"./en-ie.js": 190,
	"./en-nz": 191,
	"./en-nz.js": 191,
	"./eo": 192,
	"./eo.js": 192,
	"./es": 194,
	"./es-do": 193,
	"./es-do.js": 193,
	"./es.js": 194,
	"./et": 195,
	"./et.js": 195,
	"./eu": 196,
	"./eu.js": 196,
	"./fa": 197,
	"./fa.js": 197,
	"./fi": 198,
	"./fi.js": 198,
	"./fo": 199,
	"./fo.js": 199,
	"./fr": 202,
	"./fr-ca": 200,
	"./fr-ca.js": 200,
	"./fr-ch": 201,
	"./fr-ch.js": 201,
	"./fr.js": 202,
	"./fy": 203,
	"./fy.js": 203,
	"./gd": 204,
	"./gd.js": 204,
	"./gl": 205,
	"./gl.js": 205,
	"./he": 206,
	"./he.js": 206,
	"./hi": 207,
	"./hi.js": 207,
	"./hr": 208,
	"./hr.js": 208,
	"./hu": 209,
	"./hu.js": 209,
	"./hy-am": 210,
	"./hy-am.js": 210,
	"./id": 211,
	"./id.js": 211,
	"./is": 212,
	"./is.js": 212,
	"./it": 213,
	"./it.js": 213,
	"./ja": 214,
	"./ja.js": 214,
	"./jv": 215,
	"./jv.js": 215,
	"./ka": 216,
	"./ka.js": 216,
	"./kk": 217,
	"./kk.js": 217,
	"./km": 218,
	"./km.js": 218,
	"./ko": 219,
	"./ko.js": 219,
	"./ky": 220,
	"./ky.js": 220,
	"./lb": 221,
	"./lb.js": 221,
	"./lo": 222,
	"./lo.js": 222,
	"./lt": 223,
	"./lt.js": 223,
	"./lv": 224,
	"./lv.js": 224,
	"./me": 225,
	"./me.js": 225,
	"./mi": 226,
	"./mi.js": 226,
	"./mk": 227,
	"./mk.js": 227,
	"./ml": 228,
	"./ml.js": 228,
	"./mr": 229,
	"./mr.js": 229,
	"./ms": 231,
	"./ms-my": 230,
	"./ms-my.js": 230,
	"./ms.js": 231,
	"./my": 232,
	"./my.js": 232,
	"./nb": 233,
	"./nb.js": 233,
	"./ne": 234,
	"./ne.js": 234,
	"./nl": 236,
	"./nl-be": 235,
	"./nl-be.js": 235,
	"./nl.js": 236,
	"./nn": 237,
	"./nn.js": 237,
	"./pa-in": 238,
	"./pa-in.js": 238,
	"./pl": 239,
	"./pl.js": 239,
	"./pt": 241,
	"./pt-br": 240,
	"./pt-br.js": 240,
	"./pt.js": 241,
	"./ro": 242,
	"./ro.js": 242,
	"./ru": 243,
	"./ru.js": 243,
	"./se": 244,
	"./se.js": 244,
	"./si": 245,
	"./si.js": 245,
	"./sk": 246,
	"./sk.js": 246,
	"./sl": 247,
	"./sl.js": 247,
	"./sq": 248,
	"./sq.js": 248,
	"./sr": 250,
	"./sr-cyrl": 249,
	"./sr-cyrl.js": 249,
	"./sr.js": 250,
	"./ss": 251,
	"./ss.js": 251,
	"./sv": 252,
	"./sv.js": 252,
	"./sw": 253,
	"./sw.js": 253,
	"./ta": 254,
	"./ta.js": 254,
	"./te": 255,
	"./te.js": 255,
	"./tet": 256,
	"./tet.js": 256,
	"./th": 257,
	"./th.js": 257,
	"./tl-ph": 258,
	"./tl-ph.js": 258,
	"./tlh": 259,
	"./tlh.js": 259,
	"./tr": 260,
	"./tr.js": 260,
	"./tzl": 261,
	"./tzl.js": 261,
	"./tzm": 263,
	"./tzm-latn": 262,
	"./tzm-latn.js": 262,
	"./tzm.js": 263,
	"./uk": 264,
	"./uk.js": 264,
	"./uz": 265,
	"./uz.js": 265,
	"./vi": 266,
	"./vi.js": 266,
	"./x-pseudo": 267,
	"./x-pseudo.js": 267,
	"./yo": 268,
	"./yo.js": 268,
	"./zh-cn": 269,
	"./zh-cn.js": 269,
	"./zh-hk": 270,
	"./zh-hk.js": 270,
	"./zh-tw": 271,
	"./zh-tw.js": 271
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 471;


/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n\r\n<div class=\"page-header\">\r\n  <h1>GL Account Management</h1>\r\n</div>\r\n\r\n<div class=\"context-menu\" [ngStyle]=\"getContextMenuCss()\">\r\n  <div class=\"context-menu-item\" (click)=\"onModifyClick()\">Modify</div>\r\n  <div class=\"context-menu-item\" (click)=\"onDeleteClick()\">Delete</div>\r\n</div>\r\n\r\n<div class=\"body\">\r\n\r\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\r\n  <div class=\"row\">\r\n    <div class=\"group\">\r\n      <a class=\"circle-btn ripple circle-btn-fixed\" href=\"javascript:void(0)\" (click)=\"showCreateAccountDialog()\"></a>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"cell span_1_of_4\">\r\n      <div class=\"group\">\r\n        <input #accountCode class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterAccount()\" required>\r\n        <label class=\"text-input-label\">Account Code</label>\r\n        <span class=\"highlight\"></span>\r\n        <span class=\"bar span_4_of_4\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"cell span_2_of_4\">\r\n      <div class=\"group\">\r\n        <input #accountName class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterAccount()\" required>\r\n        <label class=\"text-input-label\">Account Name</label>\r\n        <span class=\"highlight\"></span>\r\n        <span class=\"bar span_4_of_4\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"cell span_1_of_4\">\r\n      <div class=\"group combo-group\">\r\n        <label class=\"text-input-label\">Account Type</label>\r\n        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n          <select #accountType class=\"span_4_of_4\" (change)=\"filterAccount()\">\r\n            <option> - Select - </option>\r\n            <option>Asset</option>\r\n            <option>Liability</option>\r\n            <option>Equity</option>\r\n            <option>Income</option>\r\n            <option>Expense</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"table\" #table>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"cell span_1_of_4\">\r\n        Account Code\r\n      </div>\r\n      <div class=\"cell span_2_of_4\">\r\n        Account Name\r\n      </div>\r\n      <div class=\"cell span_1_of_4\">\r\n        Account Type\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"row\" *ngFor=\"let account of accounts\" (contextmenu)=\"onRightClick($event, account.accountCode, account.accountName, account.accountType)\">\r\n      <div class=\"cell\">\r\n        {{account.accountCode}}\r\n      </div>\r\n      <div class=\"cell\">\r\n        {{account.accountName}}\r\n      </div>\r\n      <div class=\"cell\">\r\n        {{account.accountType}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-medium\" *ngIf=\"getShowModifyAccount()\">\r\n  <app-spinner *ngIf=\"processingModifyInProgress\"></app-spinner>\r\n  <div class=\"modal-header\">\r\n    <h1>GL Account Modification</h1>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <form [formGroup]=\"formGroupModify\" (ngSubmit)=\"modify()\" method=\"post\" class=\"loginform\">\r\n      <fieldset [disabled]=\"isProcessingInProgress()\">\r\n\r\n        <div class=\"group\">\r\n          <input class=\"inputMaterial input-size-medium\" readOnly formControlName=\"accountCode\" type=\"text\" value=\"{{account.accountCode}}\" required>\r\n          <label class=\"text-input-label\">Account Code</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar input-size-medium\"></span>\r\n        </div>\r\n        <div class=\"group\">\r\n          <input class=\"inputMaterial input-size-medium\" formControlName=\"accountName\" type=\"text\" value=\"{{account.accountName}}\" required>\r\n          <label class=\"text-input-label\">Account Name</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar input-size-medium\"></span>\r\n        </div>\r\n        <div class=\"group combo-group\">\r\n          <label class=\"text-input-label\">Account Type</label>\r\n          <div class=\"select select-fancy select-fancy-image\">\r\n            <select class=\"input-size-medium\" formControlName=\"accountType\" value=\"{{account.accountType}}\">\r\n            <option value=\"ASSET\">Asset</option>\r\n            <option value=\"LIABILITY\">Liability</option>\r\n            <option value=\"EQUITY\">Equity</option>\r\n            <option value=\"INCOME\">Income</option>\r\n            <option value=\"EXPENSE\">Expense</option>\r\n          </select>\r\n          </div>\r\n        </div>\r\n        <button type=\"submit\" [disabled]=\"!formGroupModify.valid\" class=\"btn ripple\">Modify</button>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"onCancelCreateAccount()\">Cancel</button>\r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-medium\" *ngIf=\"getShowCreateAccount()\">\r\n  <app-spinner *ngIf=\"processingCreateInProgress\"></app-spinner>\r\n  <div class=\"modal-header\">\r\n    <h1>GL Account Creation</h1>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <form [formGroup]=\"formGroupCreate\" (ngSubmit)=\"create()\" method=\"post\" class=\"loginform\">\r\n      <fieldset [disabled]=\"isProcessingInProgress()\">\r\n\r\n        <div class=\"group\">\r\n          <input class=\"inputMaterial input-size-medium\" formControlName=\"accountCode\" type=\"text\" required>\r\n          <label class=\"text-input-label\">Account Code</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar input-size-medium\"></span>\r\n        </div>\r\n        <div class=\"group\">\r\n          <input class=\"inputMaterial input-size-medium\" formControlName=\"accountName\" type=\"text\" required>\r\n          <label class=\"text-input-label\">Account Name</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar input-size-medium\"></span>\r\n        </div>\r\n        <div class=\"group combo-group\">\r\n          <label class=\"text-input-label\">Account Type</label>\r\n          <div class=\"select select-fancy select-fancy-image\">\r\n            <select formControlName=\"accountType\" class=\"input-size-medium\">\r\n            <option value=\"ASSET\">Asset</option>\r\n            <option value=\"LIABILITY\">Liability</option>\r\n            <option value=\"EQUITY\">Equity</option>\r\n            <option value=\"INCOME\">Income</option>\r\n            <option value=\"EXPENSE\">Expense</option>\r\n          </select>\r\n          </div>\r\n        </div>\r\n        <button type=\"submit\" [disabled]=\"!formGroupCreate.valid\" class=\"btn ripple\">Create</button>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"onCancelCreateAccount()\">Cancel</button>\r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-small\" *ngIf=\"getShowInformationMessageBox()\">\r\n  <div class=\"modal-header\">\r\n    <h1>Information</h1>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <div class=\"group\">\r\n      <p>{{informationMessage}}</p>\r\n      <button type=\"button center\" class=\"btn ripple\" (click)=\"OnClickMessageBoxOk()\">OK</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-small\" *ngIf=\"getShowConfirmationMessageBox()\">\r\n  <div class=\"modal-header\">\r\n    <h1>Confirmation</h1>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <div class=\"group\">\r\n      <p>{{confirmationMessage}}</p>\r\n      <button type=\"button\" class=\"btn ripple\" (click)=\"OnClickConfirmationBoxYes()\">Yes</button>\r\n      <button type=\"button\" class=\"btn ripple\" (click)=\"OnClickConfirmationBoxNo()\">No</button>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 473:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 474:
/***/ (function(module, exports) {

module.exports = "<div class=\"datepicker-container u-is-unselectable\" #datePickerContainer>\n  <div class=\"datepicker-input-container\">\n    <!--<input type=\"text\" class=\"datepicker-input\" [(ngModel)]=\"date.formatted\">-->\n    <div class=\"datepicker-input-icon\" (click)=\"toggle()\">\n      <i>\n        <svg width=\"58px\" height=\"58px\" viewBox=\"0 0 58 58\" version=\"1.1\">\n          <g id=\"calendar\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g id=\"Group\" fill-rule=\"nonzero\" fill=\"#000000\">\n              <path d=\"M42.899,4.5 C42.434,2.221 40.415,0.5 38,0.5 C37.447,0.5 37,0.947 37,1.5 C37,2.053 37.447,2.5 38,2.5 C39.654,2.5 41,3.846 41,5.5 C41,7.154 39.654,8.5 38,8.5 C37.447,8.5 37,8.947 37,9.5 C37,10.053 37.447,10.5 38,10.5 C40.414,10.5 42.434,8.779 42.899,6.5 L56,6.5 L56,15.5 L2,15.5 L2,6.5 L16,6.5 L19,6.5 C19.553,6.5 20,6.053 20,5.5 C20,4.947 19.553,4.5 19,4.5 L17.184,4.5 C17.598,3.338 18.698,2.5 20,2.5 C21.654,2.5 23,3.846 23,5.5 C23,7.154 21.654,8.5 20,8.5 C19.447,8.5 19,8.947 19,9.5 C19,10.053 19.447,10.5 20,10.5 C22.757,10.5 25,8.257 25,5.5 C25,2.743 22.757,0.5 20,0.5 C17.586,0.5 15.566,2.221 15.101,4.5 L0,4.5 L0,17.5 L0,57.5 L58,57.5 L58,17.5 L58,4.5 L42.899,4.5 Z M56,55.5 L2,55.5 L2,17.5 L56,17.5 L56,55.5 Z\" id=\"Shape\"></path>\n              <path d=\"M26,2.5 C27.654,2.5 29,3.846 29,5.5 C29,7.154 27.654,8.5 26,8.5 C25.447,8.5 25,8.947 25,9.5 C25,10.053 25.447,10.5 26,10.5 C28.757,10.5 31,8.257 31,5.5 C31,2.743 28.757,0.5 26,0.5 C25.447,0.5 25,0.947 25,1.5 C25,2.053 25.447,2.5 26,2.5 Z\" id=\"Shape\"></path>\n              <path d=\"M32,2.5 C33.654,2.5 35,3.846 35,5.5 C35,7.154 33.654,8.5 32,8.5 C31.447,8.5 31,8.947 31,9.5 C31,10.053 31.447,10.5 32,10.5 C34.757,10.5 37,8.257 37,5.5 C37,2.743 34.757,0.5 32,0.5 C31.447,0.5 31,0.947 31,1.5 C31,2.053 31.447,2.5 32,2.5 Z\" id=\"Shape\"></path>\n              <circle id=\"Oval\" cx=\"22\" cy=\"24.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"29\" cy=\"24.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"36\" cy=\"24.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"43\" cy=\"24.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"50\" cy=\"24.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"8\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"15\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"22\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"29\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"36\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"43\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"50\" cy=\"32.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"8\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"15\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"22\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"29\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"36\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"43\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"50\" cy=\"39.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"8\" cy=\"47.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"15\" cy=\"47.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"22\" cy=\"47.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"29\" cy=\"47.5\" r=\"1\"></circle>\n              <circle id=\"Oval\" cx=\"36\" cy=\"47.5\" r=\"1\"></circle>\n            </g>\n          </g>\n        </svg>\n      </i>\n    </div>\n  </div>\n  <div class=\"datepicker-calendar\" *ngIf=\"opened\" [ngStyle]=\"{'position': 'fixed', 'top': top + 'px'}\" #datePickerCalendar>\n    <div class=\"datepicker-calendar-top\">\n      <span class=\"year-title\">{{ currentDate.format('YYYY') }}</span>\n      <button type=\"button\" (click)=\"openYearPicker()\" *ngIf=\"!yearPicker\">\n        {{options.selectYearText}}\n      </button>\n      <i class=\"close\" (click)=\"close()\">\n        <svg width=\"350px\" height=\"349px\" viewBox=\"-1 0 350 349\" version=\"1.1\">\n          <g id=\"delete\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <path d=\"M336.559,68.611 L231.016,174.165 L336.559,279.714 C352.258,295.419 352.258,320.859 336.559,336.564 C328.715,344.408 318.431,348.333 308.152,348.333 C297.856,348.333 287.571,344.414 279.733,336.564 L174.167,231.003 L68.609,336.563 C60.766,344.407 50.481,348.332 40.193,348.332 C29.908,348.332 19.63,344.413 11.78,336.563 C-3.919,320.865 -3.919,295.424 11.78,279.713 L117.32,174.164 L11.774,68.611 C-3.925,52.912 -3.925,27.466 11.774,11.767 C27.47,-3.92 52.901,-3.92 68.603,11.767 L174.166,117.321 L279.721,11.767 C295.426,-3.92 320.86,-3.92 336.553,11.767 C352.258,27.466 352.258,52.912 336.559,68.611 Z\" id=\"Shape\" fill=\"#000000\" fill-rule=\"nonzero\"></path>\n          </g>\n        </svg>\n      </i>\n    </div>\n    <div class=\"datepicker-calendar-container\">\n      <div *ngIf=\"!yearPicker\">\n        <div class=\"datepicker-calendar-month-section\">\n          <i (click)=\"prevMonth()\">\n            <svg width=\"190px\" height=\"306px\" viewBox=\"58 0 190 306\" version=\"1.1\">\n              <g id=\"keyboard-left-arrow-button\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(58.000000, 0.000000)\">\n                <g id=\"chevron-left\" fill-rule=\"nonzero\" fill=\"#000000\">\n                  <polygon id=\"Shape\" points=\"189.35 35.7 153.65 0 0.65 153 153.65 306 189.35 270.3 72.05 153\"></polygon>\n                </g>\n              </g>\n            </svg>\n          </i>\n          <span class=\"month-title\">{{ currentDate.format('MMMM') }}</span>\n          <i (click)=\"nextMonth()\">\n            <svg width=\"190px\" height=\"306px\" viewBox=\"58 0 190 306\" version=\"1.1\">\n              <g id=\"keyboard-right-arrow-button\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(58.000000, 0.000000)\">\n                <g id=\"chevron-right\" fill-rule=\"nonzero\" fill=\"#000000\">\n                  <polygon id=\"Shape\" points=\"36.35 0 0.65 35.7 117.95 153 0.65 270.3 36.35 306 189.35 153\"></polygon>\n                </g>\n              </g>\n            </svg>\n          </i>\n        </div>\n        <div class=\"datepicker-calendar-day-names\">\n          <span>S</span>\n          <span>M</span>\n          <span>T</span>\n          <span>W</span>\n          <span>T</span>\n          <span>F</span>\n          <span>S</span>\n        </div>\n        <div class=\"datepicker-calendar-days-container\">\n          <span class=\"day\" *ngFor=\"let d of days; let i = index\"\n                            (click)=\"selectDate($event, d.momentObj)\"\n                            [ngClass]=\"{ 'disabled': !d.enabled, 'today': d.today, 'selected': d.selected }\">\n            {{ d.day }}\n          </span>\n        </div>\n        <div class=\"datepicker-buttons\" *ngIf=\"!options.autoApply\">\n          <button type=\"button\" class=\"a-button u-is-secondary u-is-small\" (click)=\"clear()\">{{options.clearText}}</button>\n          <button type=\"button\" class=\"a-button u-is-primary u-is-small\" (click)=\"today()\">{{options.todayText}}</button>\n        </div>\n      </div>\n      <div *ngIf=\"yearPicker\">\n        <div class=\"datepicker-calendar-years-container\" slimScroll [attr.options]=\"scrollOptions\">\n          <span class=\"year\" *ngFor=\"let y of years; let i = index\" (click)=\"selectYear($event, y)\">\n            {{ y }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 475:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\n<div class=\"page-header\">\n  <h1>Employee Creation</h1>\n</div>\n<div class=\"body\">\n\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\n  <div class=\"row\">\n    <a class=\"create-btn ripple create-btn-fixed\" href=\"javascript:void(0)\" (click)=\"employeeHierarchySearchForm.ngSubmit.emit()\"></a>\n  </div>\n\n  <div class=\"display-table width-with-right-margin\">\n    <div class=\"row span_4_of_4\">\n      <div>\n\n        <div class=\"tab_container\">\n          <input id=\"tab1\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"1\" checked/>\n          <label for=\"tab1\" class=\"tab-header span_1_of_6 cell\">Personal Details</label>\n\n          <input id=\"tab2\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"2\" />\n          <label for=\"tab2\" class=\"tab-header span_1_of_6 cell\">Additional Details</label>\n\n          <input id=\"tab3\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"3\" />\n          <label for=\"tab3\" class=\"tab-header span_1_of_6 cell\">Address Details</label>\n\n          <input id=\"tab4\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"4\" />\n          <label for=\"tab4\" class=\"tab-header span_1_of_6 cell\">Payroll Details</label>\n\n          <input id=\"tab5\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"5\" />\n          <label for=\"tab5\" class=\"tab-header span_1_of_6 cell\">Other Info</label>\n\n\n          <form [formGroup]=\"employeeInfo\" (ngSubmit)=\"create()\" method=\"get\" class=\"loginform\">\n            <fieldset [disabled]=\"processingInProgress\">\n              <section id=\"content1\" class=\"tab-content\">\n                <div formGroupName=\"employeeBasicInfo\">\n                  <div class=\"column\">\n                    <div class=\"display-table\">\n                      <h2 class=\"form-group-header\">Name</h2>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Title*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['title'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['title'].touched\" class=\"error-text-input-label\">Please choose a title</div>\n                            <div class=\"select select-fancy select-fancy-image span_1_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"title\">\n                          <option value=\"Mr.\">Mr</option>\n                          <option value=\"Miss.\">Miss</option>\n                          <option value=\"Mrs.\">Mrs</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"empFirstName\" maxlength=\"60\" required>\n                            <label class=\"text-input-label\">First Name*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['empFirstName'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['empFirstName'].touched\" class=\"error-text-input-label\">First Name is required</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"empMiddleName\" maxlength=\"30\" required=\"\">\n                            <label class=\"text-input-label\">Middle Name</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"empLastName\" maxlength=\"60\" required>\n                            <label class=\"text-input-label\">Last Name*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['empLastName'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['empLastName'].touched\" class=\"error-text-input-label\">Last name is required</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\" formGroupName=\"identityDocType\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Identity Doc Type*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls.identityDocType.controls['docTypeId'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls.identityDocType.controls['docTypeId'].touched\"\n                              class=\"error-text-input-label\">Please choose identity document type of employee</div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"docTypeId\">\n                          <option value=\"\"></option>\n                          <option *ngFor=\"let docType of identityDocTypes\" value=\"{{docType.docTypeId}}\">{{docType.docTypeName}}</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"identityNumber\" maxlength=\"32\" required>\n                            <label class=\"text-input-label\">Identity Number*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['identityNumber'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['identityNumber'].touched\" class=\"error-text-input-label\">Please provide corresponding identity docuemnt number</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n\n                    </div>\n                  </div>\n\n                  <div class=\"column\">\n                    <div class=\"display-table\">\n                      <h2 class=\"form-group-header\">Personal Details</h2>\n                      <div class=\"row\">\n                        <div class=\"cell span_4_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"fatherName\" maxlength=\"120\" required>\n                            <label class=\"text-input-label\">Father's Name*</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_4_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"dob\" required>\n                            <label class=\"text-input-label\">Date of birth*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['dob'].touched && \n                        employeeInfo.controls.employeeBasicInfo.controls['dob'].invalid\" class=\"error-text-input-label\">Please provide a valid date of birth</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                            <date-picker (outputEvents)=\"changeDate($event, 'dob')\" popup-placement=\"auto bottom\"></date-picker>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_4_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emailId\" maxlength=\"30\" required>\n                            <label class=\"text-input-label\">Email Id*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['emailId'].touched && \n                        employeeInfo.controls.employeeBasicInfo.controls['emailId'].invalid\" class=\"error-text-input-label\">Please provide a valid email</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_4_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"contactNo\" maxlength=\"15\" required>\n                            <label class=\"text-input-label\">Contact No*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['contactNo'].invalid && \n                        employeeInfo.controls.employeeBasicInfo.controls['contactNo'].touched\" class=\"error-text-input-label\">Please provide a valid Contact No.</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Nationality*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['nationality'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['nationality'].touched\" class=\"error-text-input-label\">Nationality is required</div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"nationality\">\n                          <option value=\"\"></option>\n                          <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Sex*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['sex'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['sex'].touched\" class=\"error-text-input-label\">Please mention Sex of employee </div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"sex\">\n                          <option value=\"MALE\">Male</option>\n                          <option value=\"FEMALE\">Female</option>\n                          <option value=\"OTHER\">Other</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Marital status*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['maritalStatus'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['maritalStatus'].touched\" class=\"error-text-input-label\">Please mention 'Marital Status' of employee </div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"maritalStatus\">\n                          <option value=\"MARRIED\">Married</option>\n                          <option value=\"SINGLE\">Single</option>\n                          <option value=\"DIVORCED\">Divorced</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"column\">\n                    <div class=\"display-table\">\n                      <h2 class=\"form-group-header\">Organization Details</h2>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"doj\" required>\n                            <label class=\"text-input-label\">Date of Joining*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['doj'].invalid && \n                        employeeInfo.controls.employeeBasicInfo.controls['doj'].touched\" class=\"error-text-input-label\">Please provide a valid 'Date of Joining'</div>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                            <date-picker (outputEvents)=\"changeDate($event, 'doj')\"></date-picker>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Organization*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['organization'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['organization'].touched\" class=\"error-text-input-label\">Please choose Employee's Organization</div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" (change)=\"onOrgChange(employeeInfo.controls.employeeBasicInfo.controls['organization'].value)\"\n                                formControlName=\"organization\">\n                          <option value=\"\"></option>\n                          <option *ngFor=\"let organization of organizations\" value=\"{{organization.orgId}}\">{{organization.orgName}}</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\" formGroupName=\"unit\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Unit*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls.unit.controls['unitId'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls.unit.controls['unitId'].touched\" class=\"error-text-input-label\">Please choose Employee's Unit</div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" (change)=\"onUnitChange(employeeInfo.controls.employeeBasicInfo.controls.unit.controls['unitId'].value)\"\n                                formControlName=\"unitId\">\n                          <option value=\"\"></option>\n                          <option *ngFor=\"let unit of units\" value=\"{{unit.unitId}}\">{{unit.unitName}}</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\" formGroupName=\"department\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Department*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls.department.controls['departmentId'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls.department.controls['departmentId'].touched\" class=\"error-text-input-label\">Please choose Employee's Department</div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"departmentId\">\n                          <option value=\"\"></option>\n                          <option *ngFor=\"let dept of departments\" value=\"{{dept.departmentId}}\">{{dept.departmentName}}</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group combo-group\">\n                            <label class=\"text-input-label\">Employee Type*</label>\n                            <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['empType'].hasError('required') && \n                        employeeInfo.controls.employeeBasicInfo.controls['empType'].touched\" class=\"error-text-input-label\">Please choose 'Employee Type'</div>\n                            <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                              <select class=\"span_4_of_4\" formControlName=\"empType\">\n                          <option value=\"PERMANENT\">Permanent</option>\n                          <option value=\"CONTRACT\">Contract</option>\n                        </select>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n              <section id=\"content2\" class=\"tab-content\">\n                <div class=\"display-table\" formGroupName=\"employeeAddlDetails\">\n                  <div class=\"row\">\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"dependentNo\" required>\n                        <label class=\"text-input-label\">No of dependents</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emergencyContactName\" maxlength=\"30\" required>\n                        <label class=\"text-input-label\">Emergency contact name</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emergencyContactNo\" maxlength=\"15\" required>\n                        <label class=\"text-input-label\">Emergency contact number</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"siblingNo\" required>\n                        <label class=\"text-input-label\">No of siblings</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"preMedicalCheckUpDate\" required>\n                        <label class=\"text-input-label\">Pre-employment checkup date</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                        <date-picker (outputEvents)=\"changeDate($event, 'preMedicalCheckUpDate')\"></date-picker>\n                      </div>\n                    </div>\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"textarea\" formControlName=\"medicalReportComment\" maxlength=\"32\" required>\n                        <label class=\"text-input-label\">Medical report comment</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"internalLabel\">Nominee Details</div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"cell grouped\">\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeName1\" required>\n                            <label class=\"text-input-label\">Nominee 1's name</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeShare1\" required>\n                            <label class=\"text-input-label\">Nominee 1's percentage</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"cell grouped\">\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeName2\" required>\n                            <label class=\"text-input-label\">Nominee 2's name</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeShare2\" required>\n                            <label class=\"text-input-label\">Nominee 2's percentage</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"cell grouped\">\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeName3\" required>\n                            <label class=\"text-input-label\">Nominee 3's name</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"row\">\n                        <div class=\"cell span_1_of_4\">\n                          <div class=\"group\">\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeShare3\" required>\n                            <label class=\"text-input-label\">Nominee 3's percentage</label>\n                            <span class=\"highlight\"></span>\n                            <span class=\"bar span_4_of_4\"></span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n              <section id=\"content3\" class=\"tab-content\">\n                <div formGroupName=\"employeeAddress\">\n                  <div class=\"toggle\">\n                    <!-- Checkbox toggle -->\n                    <input type=\"checkbox\" value=\"selected\" id=\"permanentAddress\" class=\"toggle-input\" required>\n                    <label for=\"permanentAddress\" class=\"toggle-label\">Permanent Address</label>\n                    <div role=\"toggle\" class=\"toggle-content\">\n                      <div formGroupName=\"permanent\" class=\"display-table\">\n                        <div class=\"row\">\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"houseNo\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">House No</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"streetName\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">Street name</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"region\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">Region</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"area\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">Area</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"row\">\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group combo-group\">\n                              <label class=\"text-input-label\">Country</label>\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                                <select class=\"span_4_of_4\" (change)=\"onCountryChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['countryId'].value, 'permanent')\"\n                                  formControlName=\"countryId\">\n                                <option value=\"\"></option>\n                                <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\n                              </select>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group combo-group\">\n                              <label class=\"text-input-label\">State</label>\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                                <select class=\"span_4_of_4\" formControlName=\"stateId\" (change)=\"onStateChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['stateId'].value, 'permanent')\">\n                                <option value=\"\"></option>\n                                <option *ngFor=\"let state of statesPermanent\" value=\"{{state.stateId}}\">{{state.stateName}}</option>\n                              </select>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group combo-group\">\n                              <label class=\"text-input-label\">District</label>\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                                <select class=\"span_4_of_4\" formControlName=\"districtId\">\n                                <option value=\"\"></option>\n                                <option *ngFor=\"let distr of districtsPermanent\" value=\"{{distr.districtId}}\">{{distr.districtName}}</option>\n                              </select>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"pinno\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">PIN Code</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n\n\n                  <div class=\"toggle\">\n                    <!-- Checkbox toggle -->\n                    <input type=\"checkbox\" value=\"selected\" id=\"presentAddress\" class=\"toggle-input\">\n                    <label for=\"presentAddress\" class=\"toggle-label\">Present Address</label>\n\n                    <div role=\"toggle\" class=\"toggle-content\">\n                      <div formGroupName=\"present\" class=\"display-table\">\n                        <div class=\"row\">\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input type=\"checkbox\" id=\"sameAsPermanent\" class=\"default-checkbox span_4_of_4\" [ngModelOptions]=\"{standalone: true}\" (change)=\"copyFromPermanent()\"\n                                [(ngModel)]=\"copyAddress\">\n                              <label for=\"sameAsPermanent\">Same as permanent</label>\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"row\">\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"houseNo\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">House No</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"streetName\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">Street name</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"region\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">Region</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"area\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">Area</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"row\">\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group combo-group\">\n                              <label class=\"text-input-label\">Country</label>\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                                <select class=\"span_4_of_4\" (change)=\"onCountryChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['countryId'].value, 'present')\"\n                                  formControlName=\"countryId\">\n                                <option value=\"\"></option>\n                                <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\n                              </select>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group combo-group\">\n                              <label class=\"text-input-label\">State</label>\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                                <select class=\"span_4_of_4\" formControlName=\"stateId\" (change)=\"onStateChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['stateId'].value, 'present')\">\n                                <option value=\"\"></option>\n                                <option *ngFor=\"let state of statesPresent\" value=\"{{state.stateId}}\">{{state.stateName}}</option>\n                              </select>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group combo-group\">\n                              <label class=\"text-input-label\">District</label>\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                                <select class=\"span_4_of_4\" formControlName=\"districtId\">\n                                <option value=\"\"></option>\n                                <option *ngFor=\"let distr of districtsPresent\" value=\"{{distr.districtId}}\">{{distr.districtName}}</option>\n                              </select>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class=\"cell span_1_of_4\">\n                            <div class=\"group\">\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"pinno\" maxlength=\"60\" required>\n                              <label class=\"text-input-label\">PIN Code</label>\n                              <span class=\"highlight\"></span>\n                              <span class=\"bar span_4_of_4\"></span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n              </section>\n              <section id=\"content4\" class=\"tab-content\">\n                <div class=\"display-table\">\n                  <div class=\"row\">\n                    <div class=\"cell span_4_of_4\">\n                      <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['organization'].hasError('required')\" class=\"alert alert-danger\">Please choose Employee's Organization under 'Personal Details' tab</div>\n                    </div>\n                  </div>\n                  <div formGroupName=\"employeeJobRoleDetails\" id=\"collectInputs\" *ngIf=\"!employeeInfo.controls.employeeBasicInfo.controls['organization'].hasError('required')\">\n\n                    <div class=\"row\">\n                      <div class=\"cell span_2_of_4\">\n                        <div class=\"group combo-group\">\n                          <label class=\"text-input-label\">Choose employee's grade</label>\n                          <div class=\"select select-fancy select-fancy-image span_4_of_4\">\n                            <select class=\"span_4_of_4\" (change)=\"onJobRoleChange(employeeInfo.controls.employeeJobRoleDetails.controls['jobRoleId'].value)\"\n                              formControlName=\"jobRoleId\">\n                          <option value=\"\"></option>\n                          <option *ngFor=\"let jobRole of jobRoles\" value=\"{{jobRole.jobRoleId}}\">{{jobRole.grade.gradeName}}</option>\n                        </select>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"cell span_1_of_4\">\n                      </div>\n                      <div class=\"cell span_1_of_4\">\n                      </div>\n                      <div class=\"cell span_1_of_4\">\n                      </div>\n\n                    </div>\n                    <hr/>\n                    <div id=\"components\" *ngIf=\"!employeeInfo.controls.employeeJobRoleDetails.controls['jobRoleId'].hasError('required')\">\n                      <div class=\"toggle\">\n                        <!-- Checkbox toggle -->\n                        <input type=\"checkbox\" value=\"selected\" id=\"salaryComponents\" class=\"toggle-input\">\n                        <label for=\"salaryComponents\" class=\"toggle-label\">Salary Components</label>\n\n                        <div role=\"toggle\" class=\"toggle-content\">\n\n                          <div class=\"display-table inner-component-width\">\n                            <div class=\"table\" #table>\n\n                              <div class=\"row\">\n                                <div class=\"cell span_3_of_6\">\n                                  Description\n                                </div>\n                                <div class=\"cell span_1_of_6\">\n                                  Value in BDT\n                                </div>\n                                <div class=\"cell span_1_of_6\">\n                                  Max limit\n                                </div>\n                                <div class=\"cell span_1_of_6\">\n                                  Applicable?\n                                </div>\n                              </div>\n\n\n                              <div class=\"row\" *ngFor=\"let component of salaryComponents\">\n                                <div class=\"table-cell\">\n                                  {{component.description}}\n                                </div>\n                                <div class=\"table-cell\" [style.background-color]=\"checkLimit(component.salValue, component.maxAllowLimit)\">\n                                  <input type=\"text\" style=\"border-radius: 2px\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"component.salValue\" />\n                                </div>\n                                <div class=\"table-cell\">\n                                  {{component.maxAllowLimit | currency:'BDT':true}}\n                                </div>\n                                <div class=\"table-cell\">\n                                  <input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"component.selected\">\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"toggle\">\n                        <!-- Checkbox toggle -->\n                        <input type=\"checkbox\" value=\"selected\" id=\"optionalComponents\" class=\"toggle-input\">\n                        <label for=\"optionalComponents\" class=\"toggle-label\">Optional Components</label>\n\n                        <div role=\"toggle\" class=\"toggle-content\">\n\n                          <div class=\"display-table inner-component-width\">\n                            <div class=\"table\" #table>\n\n                              <div class=\"row\">\n                                <div class=\"cell span_3_of_6\">\n                                  Description\n                                </div>\n                                <div class=\"cell span_1_of_6\">\n                                  Value in BDT\n                                </div>\n                                <div class=\"cell span_1_of_6\">\n                                  Max limit\n                                </div>\n                                <div class=\"cell span_1_of_6\">\n                                  Applicable?\n                                </div>\n                              </div>\n\n\n                              <div class=\"row\" *ngFor=\"let component of optionalBenefitComponents\">\n                                <div class=\"table-cell\">\n                                  {{component.description}}\n                                </div>\n                                <div class=\"table-cell\">\n                                  <input type=\"text\" [style.background-color]=\"checkLimit(component.salValue, component.maxAllowLimit)\" [ngModelOptions]=\"{standalone: true}\"\n                                    [(ngModel)]=\"component.salValue\" />\n                                </div>\n                                <div class=\"table-cell\">\n                                  {{component.maxAllowLimit| currency:'BDT':true}}\n                                </div>\n                                <div class=\"table-cell\">\n                                  <input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"component.selected\">\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n              <section id=\"content5\" class=\"tab-content\">\n                <div class=\"display-table\">\n                  <div class=\"row\">\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\" formGroupName=\"employeeBasicInfo\">\n                        <input type=\"checkbox\" id=\"isHr\" class=\"default-checkbox span_4_of_4\" formControlName=\"hrFlag\">\n                        <label for=\"isHr\">Is Employee an HR?</label>\n                      </div>\n                    </div>\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\" formGroupName=\"employeeBasicInfo\">\n                        <input type=\"checkbox\" id=\"isManager\" class=\"default-checkbox span_4_of_4\" formControlName=\"supervisorFlag\">\n                        <label for=\"isManager\">Is Employee a Manager?</label>\n                      </div>\n                    </div>\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\" formGroupName=\"otherDetails\">\n                        <input #hrEmailId list=\"hrEmailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"hrEmailId\" required>\n                        <datalist id=\"hrEmailId\">\n                          <option *ngFor=\"let hrEmailIdSuggestion of autoCompleteSuggestions.hrEmailIdSuggestions\" value=\"{{hrEmailIdSuggestion.hrEmailId}}\">\n                        </datalist>\n                        <label class=\"text-input-label\">HR Email</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\" formGroupName=\"otherDetails\">\n                        <input #supervisorEmailId list=\"supervisorEmailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"supervisorEmailId\"\n                          required>\n                        <datalist id=\"supervisorEmailId\">\n                          <option *ngFor=\"let supervisorEmailIdSuggestion of autoCompleteSuggestions.supervisorEmailIdSuggestions\" value=\"{{supervisorEmailIdSuggestion.supervisorEmailId}}\">\n                        </datalist>\n                        <label class=\"text-input-label\">Supervisor Email</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"row\" formGroupName=\"otherDetails\">\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"cl\" required>\n                        <label class=\"text-input-label\">No of Casual Leaves</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"maternityLeave\" required>\n                        <label class=\"text-input-label\">No of Maternity Leaves</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"paternityLeave\" required>\n                        <label class=\"text-input-label\">No of Paternity Leaves</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n\n                    <div class=\"cell span_1_of_4\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"specialLeave\" required>\n                        <label class=\"text-input-label\">No Special Leaves</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"cell span_1_of_4\" formGroupName=\"otherDetails\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"sickLeave\" required>\n                        <label class=\"text-input-label\">No of Sick Leaves</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                    <div class=\"group\" formGroupName=\"otherDetails\">\n                      <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"probationPeriodEndDate\" required>\n                      <label class=\"text-input-label\">Probation End Date</label>\n                      <span class=\"highlight\"></span>\n                      <span class=\"bar span_4_of_4\"></span>\n                      <date-picker (outputEvents)=\"changeDate($event, 'probationPeriodEndDate')\"></date-picker>\n                    </div>\n                    <div class=\"cell span_1_of_4\" formGroupName=\"employeeProfile\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"qualification\" required>\n                        <label class=\"text-input-label\">Highest qualification</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"display-table\">\n                  <div class=\"row\" formGroupName=\"employeeProfile\">\n                    <div class=\"cell span_1_of_2\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"description\" required>\n                        <label class=\"text-input-label\">Description</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                    <div class=\"cell span_1_of_2\">\n                      <div class=\"group\">\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"comments\" required>\n                        <label class=\"text-input-label\">Comments</label>\n                        <span class=\"highlight\"></span>\n                        <span class=\"bar span_4_of_4\"></span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n              <!--<div class=\"row\">\n                <button type=\"submit\" class=\"btn ripple\" [disabled]=\"canCreate()\">Create</button>\n              </div>-->\n            </fieldset>\n          </form>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"modal-small\" *ngIf=\"message!==''\">\n  <div class=\"modal-header\">\n    <h1>Message</h1>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"group center\">\n      <p>{{message}}</p>\n      <button type=\"button\" class=\"btn ripple\" (click)=\"OnClickOk()\">Ok</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 476:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n<div class=\"page-header\">\r\n  <h1>Employee Creation</h1>\r\n</div>\r\n<div class=\"body\">\r\n\r\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\r\n  <div class=\"display-table width-with-right-margin\">\r\n    <div class=\"row span_4_of_4\">\r\n      <div>\r\n\r\n        <div class=\"tab_container\">\r\n          <input id=\"tab1\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"1\" checked/>\r\n          <label for=\"tab1\" class=\"tab-header span_1_of_6 cell\">Personal Details</label>\r\n\r\n          <input id=\"tab2\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"2\" />\r\n          <label for=\"tab2\" class=\"tab-header span_1_of_6 cell\">Additional Details</label>\r\n\r\n          <input id=\"tab3\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"3\" />\r\n          <label for=\"tab3\" class=\"tab-header span_1_of_6 cell\">Address Details</label>\r\n\r\n          <input id=\"tab4\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"4\" />\r\n          <label for=\"tab4\" class=\"tab-header span_1_of_6 cell\">Payroll Details</label>\r\n\r\n          <input id=\"tab5\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"5\" />\r\n          <label for=\"tab5\" class=\"tab-header span_1_of_6 cell\">Other Info</label>\r\n\r\n\r\n          <form [formGroup]=\"employeeInfo\" (ngSubmit)=\"create()\" method=\"get\">\r\n            <fieldset [disabled]=\"processingInProgress\">\r\n              <section id=\"content1\" class=\"tab-content\">\r\n                <div formGroupName=\"employeeBasicInfo\" class=\"display-table\">\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Title*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['title'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['title'].touched\" class=\"error-text-input-label\">Please choose a title</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"title\">\r\n                          <option value=\"Mr.\">Mr</option>\r\n                          <option value=\"Miss.\">Miss</option>\r\n                          <option value=\"Mrs.\">Mrs</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"empFirstName\" maxlength=\"60\" required>\r\n                        <label class=\"text-input-label\">First Name*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['empFirstName'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['empFirstName'].touched\" class=\"error-text-input-label\">First Name is required</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"empMiddleName\" maxlength=\"30\">\r\n                        <label class=\"text-input-label\">Middle Name</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"empLastName\" maxlength=\"60\" required>\r\n                        <label class=\"text-input-label\">Last Name*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['empLastName'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['empLastName'].touched\" class=\"error-text-input-label\">Last name is required</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"fatherName\" maxlength=\"120\" required>\r\n                        <label class=\"text-input-label\">Father's/Spouse's Name*</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"dob\" required>\r\n                        <label class=\"text-input-label\">Date of birth*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['dob'].touched && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['dob'].invalid\" class=\"error-text-input-label\">Please provide a valid date of birth</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                        <date-picker (outputEvents)=\"changeDate($event, 'dob')\" popup-placement=\"auto bottom\"></date-picker>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emailId\" maxlength=\"30\" required>\r\n                        <label class=\"text-input-label\">Email Id*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['emailId'].touched && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['emailId'].invalid\" class=\"error-text-input-label\">Please provide a valid email</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"contactNo\" maxlength=\"15\" required>\r\n                        <label class=\"text-input-label\">Contact No*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['contactNo'].invalid && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['contactNo'].touched\" class=\"error-text-input-label\">Please provide a valid Contact No.</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Nationality*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['nationality'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['nationality'].touched\" class=\"error-text-input-label\">Nationality is required</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"nationality\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"doj\" required>\r\n                        <label class=\"text-input-label\">Date of Joining*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['doj'].invalid && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['doj'].touched\" class=\"error-text-input-label\">Please provide a valid 'Date of Joining'</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                        <date-picker (outputEvents)=\"changeDate($event, 'doj')\"></date-picker>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Sex*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['sex'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['sex'].touched\" class=\"error-text-input-label\">Please mention Sex of employee </div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"sex\">\r\n                          <option value=\"MALE\">Male</option>\r\n                          <option value=\"FEMALE\">Female</option>\r\n                          <option value=\"OTHER\">Other</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Marital status*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['maritalStatus'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['maritalStatus'].touched\" class=\"error-text-input-label\">Please mention 'Marital Status' of employee </div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"maritalStatus\">\r\n                          <option value=\"MARRIED\">Married</option>\r\n                          <option value=\"SINGLE\">Single</option>\r\n                          <option value=\"DIVORCED\">Divorced</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Organization*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['organization'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['organization'].touched\" class=\"error-text-input-label\">Please choose Employee's Organization</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" (change)=\"onOrgChange(employeeInfo.controls.employeeBasicInfo.controls['organization'].value)\"\r\n                            formControlName=\"organization\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let organization of organizations\" value=\"{{organization.orgId}}\">{{organization.orgName}}</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\" formGroupName=\"unit\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Unit*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls.unit.controls['unitId'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls.unit.controls['unitId'].touched\" class=\"error-text-input-label\">Please choose Employee's Unit</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" (change)=\"onUnitChange(employeeInfo.controls.employeeBasicInfo.controls.unit.controls['unitId'].value)\"\r\n                            formControlName=\"unitId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let unit of units\" value=\"{{unit.unitId}}\">{{unit.unitName}}</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\" formGroupName=\"department\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Department*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls.department.controls['departmentId'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls.department.controls['departmentId'].touched\" class=\"error-text-input-label\">Please choose Employee's Department</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"departmentId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let dept of departments\" value=\"{{dept.departmentId}}\">{{dept.departmentName}}</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Employee Type*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['empType'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['empType'].touched\" class=\"error-text-input-label\">Please choose 'Employee Type'</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"empType\">\r\n                          <option value=\"PERMANENT\">Permanent</option>\r\n                          <option value=\"CONTRACT\">Contract</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\" formGroupName=\"identityDocType\">\r\n                      <div class=\"group combo-group\">\r\n                        <label class=\"text-input-label\">Identity Doc Type*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls.identityDocType.controls['docTypeId'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls.identityDocType.controls['docTypeId'].touched\"\r\n                          class=\"error-text-input-label\">Please choose identity document type of employee</div>\r\n                        <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                          <select class=\"span_4_of_4\" formControlName=\"docTypeId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let docType of identityDocTypes\" value=\"{{docType.docTypeId}}\">{{docType.docTypeName}}</option>\r\n                        </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"identityNumber\" maxlength=\"32\" required>\r\n                        <label class=\"text-input-label\">Identity Number*</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['identityNumber'].hasError('required') && \r\n                        employeeInfo.controls.employeeBasicInfo.controls['identityNumber'].touched\" class=\"error-text-input-label\">Please provide corresponding identity docuemnt number</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </section>\r\n              <section id=\"content2\" class=\"tab-content\">\r\n                <div class=\"display-table\" formGroupName=\"employeeAddlDetails\">\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"dependentNo\">\r\n                        <label class=\"text-input-label\">No of dependents</label>\r\n                        <div *ngIf=\"employeeInfo.controls.employeeAddlDetails.controls['dependentNo'].invalid && \r\n                        employeeInfo.controls.employeeAddlDetails.controls['dependentNo'].dirty\" class=\"error-text-input-label\">Numeric values only</div>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emergencyContactName\" maxlength=\"30\">\r\n                        <label class=\"text-input-label\">Emergency contact name</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emergencyContactNo\" maxlength=\"15\">\r\n                        <label class=\"text-input-label\">Emergency contact number</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"siblingNo\">\r\n                        <label class=\"text-input-label\">No of siblings</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"preMedicalCheckUpDate\">\r\n                        <label class=\"text-input-label\">Pre-employment checkup date</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                        <date-picker (outputEvents)=\"changeDate($event, 'preMedicalCheckUpDate')\"></date-picker>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"textarea\" formControlName=\"medicalReportComment\" maxlength=\"32\">\r\n                        <label class=\"text-input-label\">Medical report comment</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"internalLabel\">Nominee Details</div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell grouped\">\r\n                      <div class=\"row\">\r\n                        <div class=\"cell span_4_of_4\">\r\n                          <div class=\"group\">\r\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeName1\">\r\n                            <label class=\"text-input-label\">Nominee 1's name</label>\r\n                            <span class=\"highlight\"></span>\r\n                            <span class=\"bar span_4_of_4\"></span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"cell span_4_of_4\">\r\n                          <div class=\"group\">\r\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeShare1\">\r\n                            <label class=\"text-input-label\">Nominee 1's percentage</label>\r\n                            <span class=\"highlight\"></span>\r\n                            <span class=\"bar span_4_of_4\"></span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell grouped\">\r\n                      <div class=\"row\">\r\n                        <div class=\"cell span_4_of_4\">\r\n                          <div class=\"group\">\r\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeName2\">\r\n                            <label class=\"text-input-label\">Nominee 2's name</label>\r\n                            <span class=\"highlight\"></span>\r\n                            <span class=\"bar span_4_of_4\"></span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"cell span_4_of_4\">\r\n                          <div class=\"group\">\r\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeShare2\">\r\n                            <label class=\"text-input-label\">Nominee 2's percentage</label>\r\n                            <span class=\"highlight\"></span>\r\n                            <span class=\"bar span_4_of_4\"></span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell grouped\">\r\n                      <div class=\"row\">\r\n                        <div class=\"cell span_4_of_4\">\r\n                          <div class=\"group\">\r\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeName3\">\r\n                            <label class=\"text-input-label\">Nominee 3's name</label>\r\n                            <span class=\"highlight\"></span>\r\n                            <span class=\"bar span_4_of_4\"></span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"cell span_4_of_4\">\r\n                          <div class=\"group\">\r\n                            <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"nomineeShare3\">\r\n                            <label class=\"text-input-label\">Nominee 3's percentage</label>\r\n                            <span class=\"highlight\"></span>\r\n                            <span class=\"bar span_4_of_4\"></span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </section>\r\n              <section id=\"content3\" class=\"tab-content\">\r\n                <div formGroupName=\"employeeAddress\">\r\n                  <div class=\"toggle\">\r\n                    <!-- Checkbox toggle -->\r\n                    <input type=\"checkbox\" value=\"selected\" id=\"permanentAddress\" class=\"toggle-input\" required>\r\n                    <label for=\"permanentAddress\" class=\"toggle-label\">Permanent Address</label>\r\n                    <div role=\"toggle\" class=\"toggle-content\">\r\n                      <div formGroupName=\"permanent\" class=\"display-table\">\r\n                        <div class=\"row\">\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"houseNo\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">House No</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"streetName\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">Street name</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"region\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">Region</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"area\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">Area</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group combo-group\">\r\n                              <label class=\"text-input-label\">Country</label>\r\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                                <select class=\"span_4_of_4\" (change)=\"onCountryChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['countryId'].value, 'permanent')\"\r\n                                  formControlName=\"countryId\">\r\n                                <option value=\"\"></option>\r\n                                <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\r\n                              </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group combo-group\">\r\n                              <label class=\"text-input-label\">State</label>\r\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                                <select class=\"span_4_of_4\" formControlName=\"stateId\" (change)=\"onStateChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['stateId'].value, 'permanent')\">\r\n                                <option value=\"\"></option>\r\n                                <option *ngFor=\"let state of statesPermanent\" value=\"{{state.stateId}}\">{{state.stateName}}</option>\r\n                              </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group combo-group\">\r\n                              <label class=\"text-input-label\">District</label>\r\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                                <select class=\"span_4_of_4\" formControlName=\"districtId\">\r\n                                <option value=\"\"></option>\r\n                                <option *ngFor=\"let distr of districtsPermanent\" value=\"{{distr.districtId}}\">{{distr.districtName}}</option>\r\n                              </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"pinno\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">PIN Code</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n                  <div class=\"toggle\">\r\n                    <!-- Checkbox toggle -->\r\n                    <input type=\"checkbox\" value=\"selected\" id=\"presentAddress\" class=\"toggle-input\">\r\n                    <label for=\"presentAddress\" class=\"toggle-label\">Present Address</label>\r\n\r\n                    <div role=\"toggle\" class=\"toggle-content\">\r\n                      <div formGroupName=\"present\" class=\"display-table\">\r\n                        <div class=\"row\">\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input type=\"checkbox\" id=\"sameAsPermanent\" class=\"default-checkbox span_4_of_4\" [ngModelOptions]=\"{standalone: true}\" (change)=\"copyFromPermanent()\"\r\n                                [(ngModel)]=\"copyAddress\">\r\n                              <label for=\"sameAsPermanent\">Same as permanent</label>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"houseNo\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">House No</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"streetName\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">Street name</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"region\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">Region</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"area\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">Area</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group combo-group\">\r\n                              <label class=\"text-input-label\">Country</label>\r\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                                <select class=\"span_4_of_4\" (change)=\"onCountryChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['countryId'].value, 'present')\"\r\n                                  formControlName=\"countryId\">\r\n                                <option value=\"\"></option>\r\n                                <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\r\n                              </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group combo-group\">\r\n                              <label class=\"text-input-label\">State</label>\r\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                                <select class=\"span_4_of_4\" formControlName=\"stateId\" (change)=\"onStateChange(employeeInfo.controls.employeeAddress.controls.permanent.controls['stateId'].value, 'present')\">\r\n                                <option value=\"\"></option>\r\n                                <option *ngFor=\"let state of statesPresent\" value=\"{{state.stateId}}\">{{state.stateName}}</option>\r\n                              </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group combo-group\">\r\n                              <label class=\"text-input-label\">District</label>\r\n                              <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                                <select class=\"span_4_of_4\" formControlName=\"districtId\">\r\n                                <option value=\"\"></option>\r\n                                <option *ngFor=\"let distr of districtsPresent\" value=\"{{distr.districtId}}\">{{distr.districtName}}</option>\r\n                              </select>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n\r\n                          <div class=\"cell span_1_of_4\">\r\n                            <div class=\"group\">\r\n                              <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"pinno\" maxlength=\"60\" required>\r\n                              <label class=\"text-input-label\">PIN Code</label>\r\n                              <span class=\"highlight\"></span>\r\n                              <span class=\"bar span_4_of_4\"></span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </section>\r\n              <section id=\"content4\" class=\"tab-content\">\r\n                <div class=\"display-table\">\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_4_of_4\">\r\n                      <div *ngIf=\"employeeInfo.controls.employeeBasicInfo.controls['organization'].hasError('required')\" class=\"alert alert-danger\">Please choose Employee's Organization under 'Personal Details' tab</div>\r\n                    </div>\r\n                  </div>\r\n                  <div formGroupName=\"employeeJobRoleDetails\" id=\"collectInputs\" *ngIf=\"!employeeInfo.controls.employeeBasicInfo.controls['organization'].hasError('required')\">\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"cell span_2_of_4\">\r\n                        <div class=\"group combo-group\">\r\n                          <label class=\"text-input-label\">Choose employee's grade</label>\r\n                          <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                            <select class=\"span_4_of_4\" (change)=\"onJobRoleChange(employeeInfo.controls.employeeJobRoleDetails.controls['jobRoleId'].value)\"\r\n                              formControlName=\"jobRoleId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let jobRole of jobRoles\" value=\"{{jobRole.jobRoleId}}\">{{jobRole.grade.gradeName}}</option>\r\n                        </select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"cell span_1_of_4\">\r\n                      </div>\r\n                      <div class=\"cell span_1_of_4\">\r\n                      </div>\r\n                      <div class=\"cell span_1_of_4\">\r\n                      </div>\r\n\r\n                    </div>\r\n                    <hr/>\r\n                    <div id=\"components\" *ngIf=\"!employeeInfo.controls.employeeJobRoleDetails.controls['jobRoleId'].hasError('required')\">\r\n                      <div class=\"toggle\">\r\n                        <!-- Checkbox toggle -->\r\n                        <input type=\"checkbox\" value=\"selected\" id=\"salaryComponents\" class=\"toggle-input\">\r\n                        <label for=\"salaryComponents\" class=\"toggle-label\">Salary Components</label>\r\n\r\n                        <div role=\"toggle\" class=\"toggle-content\">\r\n\r\n                          <div class=\"display-table inner-component-width\">\r\n                            <div class=\"table\" #table>\r\n\r\n                              <div class=\"row\">\r\n                                <div class=\"cell span_3_of_6\">\r\n                                  Description\r\n                                </div>\r\n                                <div class=\"cell span_1_of_6\">\r\n                                  Value in BDT\r\n                                </div>\r\n                                <div class=\"cell span_1_of_6\">\r\n                                  Max limit\r\n                                </div>\r\n                                <div class=\"cell span_1_of_6\">\r\n                                  Applicable?\r\n                                </div>\r\n                              </div>\r\n\r\n\r\n                              <div class=\"row\" *ngFor=\"let component of salaryComponents\">\r\n                                <div class=\"table-cell\">\r\n                                  {{component.description}}\r\n                                </div>\r\n                                <div class=\"table-cell\" [style.background-color]=\"checkLimit(component.salValue, component.maxAllowLimit)\">\r\n                                  <input type=\"text\" style=\"border-radius: 2px\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"component.salValue\" />\r\n                                </div>\r\n                                <div class=\"table-cell\">\r\n                                  {{component.maxAllowLimit | currency:'BDT':true}}\r\n                                </div>\r\n                                <div class=\"table-cell\">\r\n                                  <input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"component.selected\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"toggle\">\r\n                        <!-- Checkbox toggle -->\r\n                        <input type=\"checkbox\" value=\"selected\" id=\"optionalComponents\" class=\"toggle-input\">\r\n                        <label for=\"optionalComponents\" class=\"toggle-label\">Optional Components</label>\r\n\r\n                        <div role=\"toggle\" class=\"toggle-content\">\r\n\r\n                          <div class=\"display-table inner-component-width\">\r\n                            <div class=\"table\" #table>\r\n\r\n                              <div class=\"row\">\r\n                                <div class=\"cell span_3_of_6\">\r\n                                  Description\r\n                                </div>\r\n                                <div class=\"cell span_1_of_6\">\r\n                                  Value in BDT\r\n                                </div>\r\n                                <div class=\"cell span_1_of_6\">\r\n                                  Max limit\r\n                                </div>\r\n                                <div class=\"cell span_1_of_6\">\r\n                                  Applicable?\r\n                                </div>\r\n                              </div>\r\n\r\n\r\n                              <div class=\"row\" *ngFor=\"let component of optionalBenefitComponents\">\r\n                                <div class=\"table-cell\">\r\n                                  {{component.description}}\r\n                                </div>\r\n                                <div class=\"table-cell\">\r\n                                  <input type=\"text\" [style.background-color]=\"checkLimit(component.salValue, component.maxAllowLimit)\" [ngModelOptions]=\"{standalone: true}\"\r\n                                    [(ngModel)]=\"component.salValue\" />\r\n                                </div>\r\n                                <div class=\"table-cell\">\r\n                                  {{component.maxAllowLimit| currency:'BDT':true}}\r\n                                </div>\r\n                                <div class=\"table-cell\">\r\n                                  <input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"component.selected\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </section>\r\n              <section id=\"content5\" class=\"tab-content\">\r\n                <div class=\"display-table\">\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\" formGroupName=\"employeeBasicInfo\">\r\n                        <input type=\"checkbox\" id=\"isHr\" class=\"default-checkbox span_4_of_4\" formControlName=\"hrFlag\">\r\n                        <label for=\"isHr\">Is Employee an HR?</label>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\" formGroupName=\"employeeBasicInfo\">\r\n                        <input type=\"checkbox\" id=\"isManager\" class=\"default-checkbox span_4_of_4\" formControlName=\"supervisorFlag\">\r\n                        <label for=\"isManager\">Is Employee a Manager?</label>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\" formGroupName=\"otherDetails\">\r\n                        <input #hrEmailId list=\"hrEmailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"hrEmailId\" required>\r\n                        <datalist id=\"hrEmailId\">\r\n                          <option *ngFor=\"let hrEmailIdSuggestion of autoCompleteSuggestions.hrEmailIdSuggestions\" value=\"{{hrEmailIdSuggestion.hrEmailId}}\">\r\n                        </datalist>\r\n                        <label class=\"text-input-label\">HR Email</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\" formGroupName=\"otherDetails\">\r\n                        <input #supervisorEmailId list=\"supervisorEmailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"supervisorEmailId\"\r\n                          required>\r\n                        <datalist id=\"supervisorEmailId\">\r\n                          <option *ngFor=\"let supervisorEmailIdSuggestion of autoCompleteSuggestions.supervisorEmailIdSuggestions\" value=\"{{supervisorEmailIdSuggestion.supervisorEmailId}}\">\r\n                        </datalist>\r\n                        <label class=\"text-input-label\">Supervisor Email</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"row\" formGroupName=\"otherDetails\">\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"cl\" required>\r\n                        <label class=\"text-input-label\">No of Casual Leaves</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"maternityLeave\" required>\r\n                        <label class=\"text-input-label\">No of Maternity Leaves</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"paternityLeave\" required>\r\n                        <label class=\"text-input-label\">No of Paternity Leaves</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"cell span_1_of_4\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"specialLeave\" required>\r\n                        <label class=\"text-input-label\">No Special Leaves</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_4\" formGroupName=\"otherDetails\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"sickLeave\" required>\r\n                        <label class=\"text-input-label\">No of Sick Leaves</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\" formGroupName=\"otherDetails\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"probationPeriodEndDate\" required>\r\n                        <label class=\"text-input-label\">Probation End Date</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                        <date-picker (outputEvents)=\"changeDate($event, 'probationPeriodEndDate')\"></date-picker>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_4\" formGroupName=\"employeeProfile\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"qualification\" required>\r\n                        <label class=\"text-input-label\">Highest qualification</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"display-table\">\r\n                  <div class=\"row\" formGroupName=\"employeeProfile\">\r\n                    <div class=\"cell span_1_of_2\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"description\" required>\r\n                        <label class=\"text-input-label\">Description</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_2\">\r\n                      <div class=\"group\">\r\n                        <input class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"comments\" required>\r\n                        <label class=\"text-input-label\">Comments</label>\r\n                        <span class=\"highlight\"></span>\r\n                        <span class=\"bar span_4_of_4\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </section>\r\n              <div class=\"row\">\r\n                <button type=\"submit\" class=\"btn ripple\" [disabled]=\"canCreate()\">Create</button>\r\n              </div>\r\n            </fieldset>\r\n          </form>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<div class=\"modal-small\" *ngIf=\"message!==''\">\r\n  <div class=\"modal-header\">\r\n    <h1>Message</h1>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <div class=\"group center\">\r\n      <p>{{message}}</p>\r\n      <button type=\"button\" class=\"btn ripple\" (click)=\"OnClickOk()\">Ok</button>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 477:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n<div class=\"page-header\">\r\n  <h1>Employee Details</h1>\r\n</div>\r\n<div class=\"profile-bg\">\r\n</div>\r\n<div class=\"profile-header\">\r\n  <p *ngIf=\"!!employeeInfo\" class=\"name-header\">{{employeeInfo.employeeBasicInfo.empFirstName}} {{employeeInfo.employeeBasicInfo.empMiddleName}} {{employeeInfo.employeeBasicInfo.empLastName}}\r\n    ({{employeeInfo.employeeBasicInfo.empId}})\r\n  </p>\r\n  <p *ngIf=\"!!employeeInfo\" class=\"name-sub-header\">{{employeeInfo.appraisalRating.designation}}</p>\r\n  <p *ngIf=\"!!employeeInfo\" class=\"name-sub-header\">Contact No: {{employeeInfo.employeeBasicInfo.contactNo}}</p>\r\n  <p *ngIf=\"!!employeeInfo\" class=\"name-sub-header\">Email: {{employeeInfo.employeeBasicInfo.emailId}}</p>\r\n</div>\r\n<div class=\"profile-pic-container\">\r\n  <img class=\"profile-pic\" [src]=\"employeeInfo?.employeeBasicInfo.profileImage\" />\r\n  <label for=\"file-upload\" class=\"custom-file-upload\">EDIT</label>\r\n  <input id=\"file-upload\" type=\"file\" style=\"display: none\" accept=\".gif,.jpg,.jpeg,.png\" (change)=\"profileImageUpload($event)\" #profileImageFile>\r\n  <img class=\"profile-pic\" (click)=\"profileImageFile.click()\">\r\n  <div class=\"modal-backdrop\" *ngIf=\"getShowUpdateMessage()\">\r\n    <div class=\"modal-small\">\r\n      <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n      <div class=\"modal-header\">\r\n        <h1>Message</h1>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"group center\">\r\n          <h3>Profile Image successfully updated !!!</h3>\r\n          <div style=\"height:30px;\">\r\n          </div>\r\n          <button type=\"button\" class=\"btn ripple\" (click)=\"onClickUpdateMessageOk()\">Ok</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"body\" [ngClass]=\"{'disable-scroll' : modalDisplay === true }\">\r\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\r\n  <div style=\"height:278px;\">\r\n  </div>\r\n  <div class=\"display-table width-with-right-margin\">\r\n    <div class=\"row span_4_of_4\">\r\n      <div>\r\n        <div class=\"tab_container\">\r\n          <input id=\"tab1\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"1\" checked/>\r\n          <label for=\"tab1\" class=\"tab-header span_1_of_6 cell\">Personal Details</label>\r\n\r\n          <input id=\"tab2\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"2\" />\r\n          <label for=\"tab2\" class=\"tab-header span_1_of_6 cell\">Additional Details</label>\r\n\r\n          <input id=\"tab3\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"3\" />\r\n          <label for=\"tab3\" class=\"tab-header span_1_of_6 cell\">Address Details</label>\r\n\r\n          <input id=\"tab4\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"4\" />\r\n          <label for=\"tab4\" class=\"tab-header span_1_of_6 cell\">Payroll Details</label>\r\n\r\n          <input id=\"tab5\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"5\" />\r\n          <label for=\"tab5\" class=\"tab-header span_1_of_6 cell\">Documents</label>\r\n\r\n          <input id=\"tab6\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"6\" />\r\n          <label for=\"tab6\" class=\"tab-header span_1_of_6 cell\">Others</label>\r\n\r\n          <section id=\"content1\" class=\"tab-content\">\r\n\r\n            <div class=\"table span_4_of_4\">\r\n              <a class=\"edit-btn edit-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"editBasicInfo()\"></a>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Title</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.title}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">First Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empFirstName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Middle Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empMiddleName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Last Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empLastName}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row span_4_of_4\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Father's Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.fatherName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nationality</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.countryName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Marital Status</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.maritalStatus}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Sex</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.sex}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Date of Birth</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.dob}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Contact Number</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.contactNo}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Email</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.emailId}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Is Hr?</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.hrFlag}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Is Supervisor?</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.supervisorFlag}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Employment Type</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empType}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Identity Document</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.identityDocType.docTypeName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Identity Document Id</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.identityNumber}}</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n          <section id=\"content2\" class=\"tab-content\">\r\n            <div class=\"table span_4_of_4\">\r\n              <div></div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Dependents</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.dependentNo}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Siblings</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.siblingNo}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Emergency Contact Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.emergencyContactName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Emergency Contact Number</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.emergencyContactNo}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 1 Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeName1}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 1 share (%)</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeShare1}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 2 Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeName2}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 2 share (%)</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeShare2}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row \">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 3 Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeName3}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 3 share (%)</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeShare3}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row span_4_of_4 even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Pre Employment Medical Checkup Date</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.preMedicalCheckUpDate}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Medical Report Comment</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.medicalReportComment}}</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n\r\n          <section id=\"content3\" class=\"tab-content\">\r\n\r\n            <div class=\"toggle\">\r\n              <input type=\"checkbox\" value=\"selected\" id=\"permanentAddress\" class=\"toggle-input\" checked>\r\n              <label for=\"permanentAddress\" class=\"toggle-label\">Permanent Address</label>\r\n              <div role=\"toggle\" class=\"toggle-content\">\r\n                <div class=\"table span_4_of_4\">\r\n                  <div></div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">House Number</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].houseNo}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Street</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].streetName}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Area</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].area}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row even-row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">PIN / Zip Code</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].pinno}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Region</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].region}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">District</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].districtName}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-label\">State</label>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].stateName}}</label>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-label\">Country</label>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].countryName}}</label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"toggle\">\r\n              <input type=\"checkbox\" value=\"selected\" id=\"presentAddress\" class=\"toggle-input\" checked>\r\n              <label for=\"presentAddress\" class=\"toggle-label\">Present Address</label>\r\n              <div role=\"toggle\" class=\"toggle-content\">\r\n                <div class=\"table span_4_of_4\">\r\n                  <div></div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">House Number</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].houseNo}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Street</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].streetName}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Is Supervisor?</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].area}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row  even-row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">PIN / Zip Code</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].pinno}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Region</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].region}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">District</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].districtName}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">State</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].stateName}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Country</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].countryName}}</label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n          <section id=\"content5\" class=\"tab-content\">\r\n            <a class=\"edit-btn edit-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"editDocument()\"></a>\r\n            <a class=\"create-btn create-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"addDocument()\"></a>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_6\">\r\n                <div class=\"display-table document-height\">\r\n                  <ul>\r\n                    <li *ngFor=\"let document of employeeInfo.documentList\" [ngClass]=\"{'selectedDocument': getSelectedDocId() === document.docId}\"\r\n                      (click)=\"setSelectedDocId(document.docId)\">\r\n                      <h2>{{document.docTypeName}}</h2>{{document.docId}} - {{document.remarks}}</li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_6\">\r\n                <div class=\"display-table document-height\">\r\n                  <object width=\"100%\" height=\"98%\" [title]=\"selectedDocDetails?.docTypeName\" [data]=\"selectedDocument | safe\">\r\n                  </object>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </section>\r\n          <section id=\"content6\" class=\"tab-content\">\r\n            <div class=\"table span_4_of_4\">\r\n              <div></div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">HR Email</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.hrEmailId}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Supervisor Email</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.supervisorEmailId}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Casual Leaves</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.cL}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Sick Leaves</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.specialLeave}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Paternity Leaves</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.paternityLeave}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Maternity Leave</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.maternityLeave}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Employment Status</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.status}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Probation Period End Date</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.probationPeriodEndDate}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Notice Period End Date</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.noticePeriodEndDate}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\"></label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\"></label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" (click)=\"closeAllDialog($event)\" *ngIf=\"getShowEditBasicInfo()\">\r\n  <div class=\"modal-medium\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div class=\"modal-header\">\r\n      <h1>Edit Employee Details</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <a class=\"modal-close-btn modal-close-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"closeAllDialog(null)\"></a>\r\n      <a class=\"save-btn save-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"formGroupBasicInfoForm.ngSubmit.emit()\"></a>\r\n      <form [formGroup]=\"formGroupBasicInfo\" #formGroupBasicInfoForm=\"ngForm\" (ngSubmit)=\"onBasicInfoUpdate()\" method=\"post\">\r\n        <fieldset [disabled]=\"isProcessingInProgress()\">\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Name</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Title*</label>\r\n                  <div class=\"select select-fancy select-fancy-image\">\r\n                    <select formControlName=\"title\">\r\n                          <option value=\"Mr.\">Mr</option>\r\n                          <option value=\"Miss.\">Miss</option>\r\n                          <option value=\"Mrs.\">Mrs</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"empFirstName\" required>\r\n                  <label class=\"text-input-label\">First Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"empMiddleName\" required>\r\n                  <label class=\"text-input-label\">Middle Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"empLastName\" required>\r\n                  <label class=\"text-input-label\">Last Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Identity Details</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\" formGroupName=\"identityDocType\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Identity Doc Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"docTypeId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let docType of identityDocTypes\" value=\"{{docType.docTypeId}}\">{{docType.docTypeName}}</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"identityNumber\" required>\r\n                  <label class=\"text-input-label\">Identity Number</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Contact Information</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"emailId\" required>\r\n                  <label class=\"text-input-label\">Email Id</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"contactNo\" required>\r\n                  <label class=\"text-input-label\">ContactNumber</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Personal Details</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"fatherName\" required>\r\n                  <label class=\"text-input-label\">Father's Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Nationality</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"nationality\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Marital status</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"maritalStatus\">\r\n                          <option value=\"MARRIED\">Married</option>\r\n                          <option value=\"SINGLE\">Single</option>\r\n                          <option value=\"DIVORCED\">Divorced</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Sex</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"sex\">\r\n                          <option value=\"MALE\">Male</option>\r\n                          <option value=\"FEMALE\">Female</option>\r\n                          <option value=\"OTHER\">Other</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"dob\" required>\r\n                  <label class=\"text-input-label\">Date of Birth</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Organization Details</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group\">\r\n                  <input type=\"checkbox\" id=\"isHr\" class=\"default-checkbox span_4_of_4\" formControlName=\"hrFlag\">\r\n                  <label for=\"isHr\">Is Employee an HR?</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group\">\r\n                  <input type=\"checkbox\" id=\"isManager\" class=\"default-checkbox span_4_of_4\" formControlName=\"supervisorFlag\">\r\n                  <label for=\"isManager\">Is Employee a Manager?</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Employee Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"empType\">\r\n                          <option value=\"PERMANENT\">Permanent</option>\r\n                          <option value=\"CONTRACT\">Contract</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" (click)=\"closeAllDialog($event)\" *ngIf=\"getShowDocumentEdit()\">\r\n  <div class=\"modal-medium\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div class=\"modal-header\">\r\n      <h1>Edit Employee Documents</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <a class=\"modal-close-btn modal-close-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"closeAllDialog(null)\"></a>\r\n      <a class=\"save-btn save-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"formGroupDocumentForm.ngSubmit.emit()\"></a>\r\n      <form [formGroup]=\"formGroupDocument\" #formGroupDocumentForm=\"ngForm\" (ngSubmit)=\"onDocumentUpdate()\" method=\"post\">\r\n        <fieldset [disabled]=\"isProcessingInProgress()\">\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"docId\" required readonly>\r\n                  <label class=\"text-input-label\">Document Id</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Document Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image\">\r\n                    <select formControlName=\"docTypeId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let docType of docTypes\" value=\"{{docType.docTypeId}}\">{{docType.docTypeName}}</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"remarks\" required>\r\n                  <label class=\"text-input-label\">Remarks</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input type=\"file\" style=\"display:none\" accept=\".pdf\" (change)=\"documentUpload($event)\" #documentFile>\r\n                  <input class=\"inputMaterial\" formControlName=\"documentName\" required (click)=\"documentFile.click()\" readonly>\r\n                  <label class=\"text-input-label\">Document</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" (click)=\"closeAllDialog($event)\" *ngIf=\"getShowSelectDocumentAlert()\">\r\n  <div class=\"modal-small\">\r\n    <div class=\"modal-header\">\r\n      <h1>Alert</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <a class=\"modal-close-btn modal-close-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"closeAllDialog(null)\"></a>\r\n      <div class=\"group center\">\r\n        <h3>Please select a document</h3>\r\n        <div style=\"height:30px;\">\r\n        </div>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"closeAllDialog(null)\">OK</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 478:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n\r\n<div class=\"page-header\">\r\n  <h1>Employee Hierarchy Search Result</h1>\r\n</div>\r\n\r\n<div class=\"body\">\r\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\r\n  <div class=\"row\">\r\n      <a class=\"back-btn ripple back-btn-fixed\" href=\"javascript:void(0)\" (click)=\"backToSearchCriteria()\"></a>\r\n  </div>\r\n\r\n  <div class=\"display-table width-with-right-margin\">\r\n    <div class=\"row\">\r\n      <div class=\"cell span_1_of_5\">\r\n        <div class=\"group\">\r\n          <input #employeeId class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterEmployee($event,'employeeId')\" required>\r\n          <label class=\"text-input-label\">Employee Id</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar span_4_of_4\"></span>\r\n        </div>\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        <div class=\"group\">\r\n          <input #employeeName class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterEmployee($event,'employeeName')\" required>\r\n          <label class=\"text-input-label\">Name</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar span_4_of_4\"></span>\r\n        </div>\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        <div class=\"group\">\r\n          <input #emailId class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterEmployee($event,'emailId')\" required>\r\n          <label class=\"text-input-label\">Email</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar span_4_of_4\"></span>\r\n        </div>\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        <div class=\"group\">\r\n          <input #contactNumber class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterEmployee($event,'contactNumber')\" required>\r\n          <label class=\"text-input-label\">Contact No.</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar span_4_of_4\"></span>\r\n        </div>\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        <div class=\"group\">\r\n          <input #designation class=\"inputMaterial span_4_of_4\" type=\"text\" (keyup)=\"filterEmployee($event,'designation')\" required>\r\n          <label class=\"text-input-label\">Designation</label>\r\n          <span class=\"highlight\"></span>\r\n          <span class=\"bar span_4_of_4\"></span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"table  width-with-right-margin\" #table>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"cell span_1_of_5\">\r\n        Employee Id\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        Name\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        Email\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        Contact No.\r\n      </div>\r\n      <div class=\"cell span_1_of_5\">\r\n        Designation\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"row outer-component-width\" *ngFor=\"let employee of employees\" (contextmenu)=\"onRightClick($event, employee.id)\">\r\n      <div class=\"cell\">\r\n        <a [routerLink]=\"['/employeeDetails', employee.empId]\">{{employee.empId}}</a>\r\n      </div>\r\n      <div class=\"cell\">\r\n        {{employee.name}}\r\n      </div>\r\n      <div class=\"cell\">\r\n        {{employee.emailId}}\r\n      </div>\r\n      <div class=\"cell\">\r\n        {{employee.contactNo}}\r\n      </div>\r\n      <div class=\"cell\">\r\n        {{employee.designation}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"group center outer-component-width\">\r\n    <a class=\"previous-btn ripple\" href=\"javascript:void(0)\" (click)=\"previous()\">&laquo;</a>\r\n    <a class=\"next-btn ripple\" href=\"javascript:void(0)\" (click)=\"next()\">&raquo;</a>\r\n    <p class=\"page-status\">{{pagination.lowerRange}} to {{pagination.upperRange}} of {{pagination.searchResultSetSize}}</p>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 479:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n\r\n<div class=\"page-header\">\r\n  <h1>Employee Hierarchy Search</h1>\r\n</div>\r\n\r\n<div class=\"body\">\r\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\r\n  <div class=\"row\">\r\n      <a class=\"search-btn ripple search-btn-fixed\" href=\"javascript:void(0)\" (click)=\"employeeHierarchySearchForm.ngSubmit.emit()\"></a>\r\n  </div>\r\n  <form [formGroup]=\"formGroupSearch\" #employeeHierarchySearchForm=\"ngForm\" (ngSubmit)=\"search()\" method=\"get\" class=\"loginform width-with-right-margin\">\r\n    <fieldset [disabled]=\"processingInProgress\">\r\n      <div class=\"toggle\">\r\n        <!-- Checkbox toggle -->\r\n        <input type=\"checkbox\" value=\"selected\" id=\"employeePersonalDetails\" class=\"toggle-input\" checked>\r\n        <label for=\"employeePersonalDetails\" class=\"toggle-label\">Employee Personal Details</label>\r\n\r\n        <div role=\"toggle\" class=\"toggle-content\">\r\n          <div class=\"display-table inner-component-width\">\r\n            <div class=\"row\">\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #firstName list=\"firstName\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"firstName\" required>\r\n                  <datalist id=\"firstName\">\r\n                    <option *ngFor=\"let firstNameSuggestion of autoCompleteSuggestions.firstNameSuggestions\" value=\"{{firstNameSuggestion.firstName}}\">\r\n                  </datalist>\r\n                  <label class=\"text-input-label\">First Name</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #middleName list=\"middleName\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"middleName\" required>\r\n                  <datalist id=\"middleName\">\r\n                    <option *ngFor=\"let middleNameSuggestion of autoCompleteSuggestions.middleNameSuggestions\" value=\"{{middleNameSuggestion.middleName}}\">\r\n                  </datalist>\r\n                  <label class=\"text-input-label\">Middle Name</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #lastName list=\"lastName\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"lastName\" required>\r\n                  <datalist id=\"lastName\">\r\n                    <option *ngFor=\"let lastNameSuggestion of autoCompleteSuggestions.lastNameSuggestions\" value=\"{{lastNameSuggestion.lastName}}\">\r\n                  </datalist>\r\n                  <label class=\"text-input-label\">Last Name</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Sex</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"sex\">\r\n                  <option value=\"\"></option>\r\n                  <option value=\"MALE\">Male</option>\r\n                  <option value=\"FEMALE\">Female</option>\r\n                  <option value=\"OTHERS\">Others</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Identity Document</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"identityDocTypeId\">\r\n                  <option value=\"\"></option>\r\n                  <option *ngFor=\"let identityDocType of identityDocTypes\" value=\"{{identityDocType.docTypeId}}\">{{identityDocType.docTypeName}}</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #identityDocNumber class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"identityDocNumber\" required>\r\n                  <label class=\"text-input-label\">Identity Document Number</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #employeeId class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"employeeId\" required>\r\n                  <label class=\"text-input-label\">Employee Id</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #emailId list=\"emailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"emailId\" required>\r\n                  <datalist id=\"emailId\">\r\n                    <option *ngFor=\"let emailIdSuggestion of autoCompleteSuggestions.emailIdSuggestions\" value=\"{{emailIdSuggestion.emailId}}\">\r\n                  </datalist>\r\n                  <label class=\"text-input-label\">Email Id</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Employment Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"empType\">\r\n                  <option value=\"PERMANENT\">Permanent</option>\r\n                  <option value=\"CONTRACT\">Contract</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"toggle\">\r\n        <!-- Checkbox toggle -->\r\n        <input type=\"checkbox\" value=\"selected\" id=\"organizationalInformation\" class=\"toggle-input\" checked>\r\n        <label for=\"organizationalInformation\" class=\"toggle-label\">Organizational Information</label>\r\n\r\n        <div role=\"toggle\" class=\"toggle-content\">\r\n\r\n          <div class=\"display-table inner-component-width\">\r\n            <div class=\"row\">\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Organization</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" #organizationId formControlName=\"orgId\" (change)=\"onOrgChange(organizationId.value)\">\r\n                  <option value=\"\"></option>\r\n                  <option *ngFor=\"let organization of organizations\" value=\"{{organization.orgId}}\">{{organization.orgName}}</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Unit</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" #unitId formControlName=\"unitId\" (change)=\"onUnitChange(unitId.value)\">\r\n                  <option value=\"\"></option>\r\n                  <option *ngFor=\"let unit of units\" value=\"{{unit.unitId}}\">{{unit.unitName}}</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Department</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"departmentId\">\r\n                  <option value=\"\"></option>\r\n                  <option *ngFor=\"let department of departments\" value=\"{{department.departmentId}}\">{{department.departmentName}}</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Grade</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"jobRoleId\" #jobRoleId (change)=\"onGradeChange(jobRoleId.value)\">\r\n                  <option value=\"\"></option>\r\n                  <option *ngFor=\"let jobRole of jobRoles\" value=\"{{jobRole.jobRoleId}}\">{{jobRole.grade.gradeName}}</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Designation</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"designationId\">\r\n                  <option value=\"\"></option>\r\n                  <option *ngFor=\"let designation of designations\" value=\"{{designation.designationId}}\">{{designation.designationName}}</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Is Supervisor?</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"isSupervisor\">\r\n                  <option value=\"\"></option>\r\n                  <option value=\"YES\">Yes</option>\r\n                  <option value=\"NO\">No</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Is HR?</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"isHr\">\r\n                  <option value=\"\"></option>\r\n                  <option value=\"YES\">Yes</option>\r\n                  <option value=\"NO\">No</option>\r\n                </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #supervisorEmailId list=\"supervisorEmailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"supervisorEmailId\"\r\n                    required>\r\n                  <datalist id=\"supervisorEmailId\">\r\n                    <option *ngFor=\"let supervisorEmailIdSuggestion of autoCompleteSuggestions.supervisorEmailIdSuggestions\" value=\"{{supervisorEmailIdSuggestion.supervisorEmailId}}\">\r\n                  </datalist>\r\n                  <label class=\"text-input-label\">Supervisor Email</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_1_of_3\">\r\n                <div class=\"group\">\r\n                  <input #hrEmailId list=\"hrEmailId\" class=\"inputMaterial span_4_of_4\" type=\"text\" formControlName=\"hrEmailId\" required>\r\n                  <datalist id=\"hrEmailId\">\r\n                    <option *ngFor=\"let hrEmailIdSuggestion of autoCompleteSuggestions.hrEmailIdSuggestions\" value=\"{{hrEmailIdSuggestion.hrEmailId}}\">\r\n                  </datalist>\r\n                  <label class=\"text-input-label\">HR Email</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"bar span_4_of_4\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <button type=\"submit\" class=\"btn ripple\">Search</button>\r\n      </div>\r\n    </fieldset>\r\n  </form>\r\n</div>"

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CountryService = (function () {
    function CountryService(httpService) {
        this.httpService = httpService;
    }
    CountryService.prototype.getCountries = function () {
        return this.httpService.callHttpGet("/resources/v1/country")
            .map(function (res) { return res.json(); });
    };
    return CountryService;
}());
CountryService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], CountryService);

var _a;
//# sourceMappingURL=country.service.js.map

/***/ }),

/***/ 480:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\n<div class=\"heroimage\">\n</div>\n<h1 class=\"herotext\">The access to this page is restricted...</h1>\n<p class=\"heroparagraphs\">Please contact your system administrator to get access to this page.</p>\n"

/***/ }),

/***/ 481:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n<div class=\"body home-background\">\r\n  <h1 class=\"herotext\">HAMDARD UNIVERSITY MANAGEMENT CENTRE</h1>\r\n  <img class=\"zainlogo\" src=\"/assets/img/loginimage-min.jpg\"/>\r\n</div>\r\n"

/***/ }),

/***/ 482:
/***/ (function(module, exports) {

module.exports = "<div class=\"heroimage\">\r\n</div>\r\n\r\n\r\n<div class=\"login\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div [@heroState]=\"getLoginStatus()\" class=\"alert alert-danger\">Invalid username or password</div>\r\n    <h1 class=\"herotext\">HAMDARD UNIVERSITY MANAGEMENT CENTRE</h1>\r\n    <form [formGroup]=\"formGroup\" (ngSubmit)=\"onClick()\" method=\"post\" class=\"loginform\">\r\n        <fieldset [disabled]=\"isProcessingInProgress()\">\r\n            <div class=\"loginrow\">\r\n                <input formControlName=\"username\" type=\"text\" class=\"logininput name\" placeholder=\"Username\"/>\r\n            </div>\r\n            <div class=\"loginrow\">\r\n                <input formControlName=\"password\" type=\"password\" class=\"logininput pass\" placeholder=\"Password\"/>\r\n            </div>\r\n            <button type=\"submit\" class=\"loginsubmit ripple\">Sign in</button>\r\n        </fieldset>\r\n    </form>\r\n</div>"

/***/ }),

/***/ 483:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\n<div class=\"heroimage\">\n</div>\n<h1 class=\"herotext\">We're lost in the mountains...</h1>\n<p class=\"heroparagraphs\">The page you're looking for is not here. <br>Let's go back home.</p>\n"

/***/ }),

/***/ 484:
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" [ngClass]=\"{'sidebar-open': getOpen() === true}\">\r\n  <div class=\"menu-icon\" title=\"Menu\" (click)=\"changeClass()\" [ngClass]=\"{'open': getOpen() === true}\">\r\n    <span></span>\r\n    <span></span>\r\n    <span></span>\r\n  </div>\r\n  <div class=\"home-icon\" title=\"Home\" (click)=\"goHome()\">\r\n    <span class=\"span1\">\r\n      <span class=\"span2\">\r\n      </span>\r\n    </span>\r\n  </div>\r\n  <div class=\"logout-icon\" title=\"Logout\" (click)=\"onClickLogout()\">\r\n    <span class=\"span3\">\r\n    </span>\r\n  </div>\r\n</div>\r\n<div class=\"menu\" [ngClass]=\"{'show-menu': getOpen() === true}\" *ngIf=\"getOpen()\">\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_4_of_4\">\r\n      <h1 class=\"username\">{{getUserName()}}</h1>\r\n      <p class=\"change-password\"><a (click)=\"onClickChangePassword()\">Change Password</a></p>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_4_of_4\">\r\n      <h2 class=\"menu-header\">Accounting Reports</h2>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\">Balance Sheet</a></li>\r\n      </ol>\r\n    </div>\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\">Trial Balance</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_4_of_4\">\r\n      <h2 class=\"menu-header\">Accounting Configuration</h2>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\">College Code Management</a></li>\r\n        <li><a class=\"menu-item\">Department Code Management</a></li>\r\n        <li><a class=\"menu-item\">Charge Type Management</a></li>\r\n      </ol>\r\n    </div>\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\">Transaction Type Management</a></li>\r\n        <li><a class=\"menu-item\" (click)=\"onClickAccountMgmt()\">GL Account Management</a></li>\r\n        <li><a class=\"menu-item\">Accounting Rules Management</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_4_of_4\">\r\n      <h2 class=\"menu-header\">HRMS Activities</h2>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\" (click)=\"onClickUserDetails()\">My Details</a></li>\r\n        <li><a class=\"menu-item\" (click)=\"onClickEmployeeHierarchySearch()\">Employee Hierarchy Search</a></li>\r\n      </ol>\r\n    </div>\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\" (click)=\"onClickEmployeeCreation()\">Employee Creation</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!--<div class=\"sidebar-row\">\r\n    <div class=\"col span_4_of_4\">\r\n      <h2 class=\"menu-header\">System Administration</h2>\r\n    </div>\r\n  </div>\r\n  <div class=\"sidebar-row\">\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\">User Management</a></li>\r\n      </ol>\r\n    </div>\r\n    <div class=\"col span_2_of_4\">\r\n      <ol>\r\n        <li><a class=\"menu-item\">Role Management</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>-->\r\n</div>\r\n<div class=\"modal-backdrop\" *ngIf=\"getShowChangePassword()\">\r\n  <div class=\"modal-small\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div class=\"modal-header\">\r\n      <h1>Change Password</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <form [formGroup]=\"formGroup\" (ngSubmit)=\"onChangePassword()\" method=\"post\" class=\"loginform\">\r\n        <fieldset [disabled]=\"isProcessingInProgress()\">\r\n          <div class=\"display-table inner-component-width\">\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"currentPassword\" type=\"password\" required>\r\n                  <label class=\"text-input-label\">Current Password</label>\r\n                  <label *ngIf=\"isFieldValueMissing('currentPassword')\" class=\"error-text-input-label\">Please enter your current password.</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"input-size-small\" [ngClass]=\"getErrorClass('currentPassword')\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"newPassword\" type=\"password\" required>\r\n                  <label class=\"text-input-label\">New Password</label>\r\n                  <label *ngIf=\"isFieldValueMissing('newPassword')\" class=\"error-text-input-label\">Please enter your new password.</label>\r\n                  <label *ngIf=\"isValueInvalid('newPassword')\" class=\"error-text-input-label\">Please enter atleast six characters.</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"input-size-small\" [ngClass]=\"getErrorClass('newPassword')\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"confirmedPassword\" type=\"password\" required>\r\n                  <label class=\"text-input-label\">Confirm Password</label>\r\n                  <label *ngIf=\"isFieldValueMissing('confirmedPassword')\" class=\"error-text-input-label\">Please confirm your new password.</label>\r\n                  <label *ngIf=\"isConfirmedPasswordNotMatching()\" class=\"error-text-input-label\">The confirmed password is not matching.</label>\r\n                  <span class=\"highlight\"></span>\r\n                  <span class=\"input-size-small\" [ngClass]=\"getErrorClass('confirmedPassword')\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of4\">\r\n                <div class=\"group\">\r\n                  <button type=\"submit\" class=\"btn ripple\" [disabled]=\"formGroup.invalid\">Change</button>\r\n                  <button type=\"button\" class=\"btn ripple\" (click)=\"onCancelChangePassword()\">Cancel</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" *ngIf=\"changePasswordMessage!==''\">\r\n  <div class=\"modal-small\">\r\n    <div class=\"modal-header\">\r\n      <h1>Message</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div class=\"group center\">\r\n        <p>{{changePasswordMessage}}</p>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"OnClickOk()\">Ok</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" *ngIf=\"getShowLogoutMessage()\">\r\n  <div class=\"modal-small\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div class=\"modal-header\">\r\n      <h1>Alert</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div class=\"group center\">\r\n        <h3>Are you sure you want to logout ?</h3>\r\n        <div style=\"height:30px;\">\r\n        </div>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"logout()\">Yes</button>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"onCancelLogout()\">No</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 485:
/***/ (function(module, exports) {

module.exports = "<div class=\"loader\">Loading...</div>"

/***/ }),

/***/ 486:
/***/ (function(module, exports) {

module.exports = "<app-side-bar></app-side-bar>\r\n<div class=\"page-header\">\r\n  <h1>My Details</h1>\r\n</div>\r\n<div class=\"profile-bg\">\r\n</div>\r\n<div class=\"profile-header\">\r\n  <p class=\"name-header\">{{employeeInfo?.employeeBasicInfo.empFirstName}} {{employeeInfo?.employeeBasicInfo.empMiddleName}} {{employeeInfo?.employeeBasicInfo.empLastName}}\r\n    ({{employeeInfo?.employeeBasicInfo.empId}})\r\n  </p>\r\n  <p class=\"name-sub-header\">{{employeeInfo?.appraisalRating.designation}}</p>\r\n  <p class=\"name-sub-header\">Contact No: {{employeeInfo?.employeeBasicInfo.contactNo}}</p>\r\n  <p class=\"name-sub-header\">Email: {{employeeInfo?.employeeBasicInfo.emailId}}</p>\r\n</div>\r\n<div class=\"profile-pic-container\">\r\n  <img class=\"profile-pic\" [src]=\"employeeInfo?.employeeBasicInfo.profileImage\" />\r\n  <label for=\"file-upload\" class=\"custom-file-upload\">EDIT</label>\r\n  <input id=\"file-upload\" type=\"file\" style=\"display: none\" accept=\".gif,.jpg,.jpeg,.png\" (change)=\"profileImageUpload($event)\" #profileImageFile>\r\n  <img class=\"profile-pic\" (click)=\"profileImageFile.click()\">\r\n  <div class=\"modal-backdrop\" *ngIf=\"getShowUpdateMessage()\">\r\n    <div class=\"modal-small\">\r\n      <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n      <div class=\"modal-header\">\r\n        <h1>Message</h1>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"group center\">\r\n          <h3>Profile Image successfully updated !!!</h3>\r\n          <div style=\"height:30px;\">\r\n          </div>\r\n          <button type=\"button\" class=\"btn ripple\" (click)=\"onClickUpdateMessageOk()\">Ok</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"body\" [ngClass]=\"{'disable-scroll' : modalDisplay === true }\">\r\n  <app-spinner *ngIf=\"processingInProgress\"></app-spinner>\r\n  <div style=\"height:278px;\">\r\n  </div>\r\n  <div class=\"display-table width-with-right-margin\">\r\n    <div class=\"row span_4_of_4\">\r\n      <div>\r\n        <div class=\"tab_container\">\r\n          <input id=\"tab1\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"1\" checked/>\r\n          <label for=\"tab1\" class=\"tab-header span_1_of_6 cell\">Personal Details</label>\r\n\r\n          <input id=\"tab2\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"2\" />\r\n          <label for=\"tab2\" class=\"tab-header span_1_of_6 cell\">Additional Details</label>\r\n\r\n          <input id=\"tab3\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"3\" />\r\n          <label for=\"tab3\" class=\"tab-header span_1_of_6 cell\">Address Details</label>\r\n\r\n          <input id=\"tab4\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"4\" />\r\n          <label for=\"tab4\" class=\"tab-header span_1_of_6 cell\">Payroll Details</label>\r\n\r\n          <input id=\"tab5\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"5\" />\r\n          <label for=\"tab5\" class=\"tab-header span_1_of_6 cell\">Documents</label>\r\n\r\n          <input id=\"tab6\" class=\"tab-radio\" type=\"radio\" name=\"tabs\" value=\"6\" />\r\n          <label for=\"tab6\" class=\"tab-header span_1_of_6 cell\">Others</label>\r\n\r\n          <section id=\"content1\" class=\"tab-content\">\r\n\r\n            <div class=\"table span_4_of_4\">\r\n              <a class=\"edit-btn edit-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"editBasicInfo()\"></a>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Title</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.title}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n                <div class=\"cell\">\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">First Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empFirstName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Middle Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empMiddleName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Last Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empLastName}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row span_4_of_4\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Father's Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.fatherName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nationality</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.countryName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Marital Status</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.maritalStatus}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Sex</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.sex}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Date of Birth</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.dob}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Contact Number</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.contactNo}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Email</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.emailId}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Is Hr?</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <input type=\"checkbox\" name=\"isHr\" [checked]=\"employeeInfo?.employeeBasicInfo.hrFlag\" disabled />\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Is Supervisor?</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <input type=\"checkbox\" name=\"isSupervisor\" [checked]=\"employeeInfo?.employeeBasicInfo.supervisorFlag\" disabled />\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Employment Type</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.empType}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Identity Document</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.identityDocType.docTypeName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Identity Document Id</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeBasicInfo.identityNumber}}</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n          <section id=\"content2\" class=\"tab-content\">\r\n            <div class=\"table span_4_of_4\">\r\n              <div></div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Dependents</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.dependentNo}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Siblings</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.siblingNo}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Emergency Contact Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.emergencyContactName}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Emergency Contact Number</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.emergencyContactNo}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 1 Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeName1}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 1 share (%)</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeShare1}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 2 Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeName2}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 2 share (%)</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeShare2}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row \">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 3 Name</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeName3}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Nominee 3 share (%)</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.nomineeShare3}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row span_4_of_4 even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Pre Employment Medical Checkup Date</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.preMedicalCheckUpDate}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Medical Report Comment</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeAddlDetails.medicalReportComment}}</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n\r\n          <section id=\"content3\" class=\"tab-content\">\r\n\r\n            <div class=\"toggle\">\r\n              <input type=\"checkbox\" value=\"selected\" id=\"permanentAddress\" class=\"toggle-input\" checked>\r\n              <label for=\"permanentAddress\" class=\"toggle-label\">Permanent Address</label>\r\n              <div role=\"toggle\" class=\"toggle-content\">\r\n                <div class=\"table span_4_of_4\">\r\n                  <div></div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">House Number</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].houseNo}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Street</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].streetName}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Area</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].area}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row even-row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">PIN / Zip Code</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].pinno}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Region</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].region}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">District</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].districtName}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-label\">State</label>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].stateName}}</label>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-label\">Country</label>\r\n                    </div>\r\n                    <div class=\"cell span_1_of_6\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[0].countryName}}</label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"toggle\">\r\n              <input type=\"checkbox\" value=\"selected\" id=\"presentAddress\" class=\"toggle-input\" checked>\r\n              <label for=\"presentAddress\" class=\"toggle-label\">Present Address</label>\r\n              <div role=\"toggle\" class=\"toggle-content\">\r\n                <div class=\"table span_4_of_4\">\r\n                  <div></div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">House Number</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].houseNo}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Street</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].streetName}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Is Supervisor?</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].area}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row  even-row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">PIN / Zip Code</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].pinno}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Region</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].region}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">District</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].districtName}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">State</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].stateName}}</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-label\">Country</label>\r\n                    </div>\r\n                    <div class=\"cell\">\r\n                      <label class=\"text-value\">{{employeeInfo?.employeeAddress[1].countryName}}</label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n          <section id=\"content5\" class=\"tab-content\">\r\n            <a class=\"edit-btn edit-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"editDocument()\"></a>\r\n            <a class=\"create-btn create-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"addDocument()\"></a>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_6\">\r\n                <div class=\"display-table document-height\">\r\n                  <ul>\r\n                    <li *ngFor=\"let document of employeeInfo?.documentList\" [ngClass]=\"{'selectedDocument': getSelectedDocId() === document.docId}\"\r\n                      (click)=\"setSelectedDocId(document.docId)\">\r\n                      <h2>{{document.docTypeName}}</h2>{{document.docId}} - {{document.remarks}}</li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_6\">\r\n                <div class=\"display-table document-height\">\r\n                  <object width=\"100%\" height=\"98%\" [title]=\"selectedDocDetails?.docTypeName\" [data]=\"selectedDocument | safe\">\r\n                  </object>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </section>\r\n          <section id=\"content6\" class=\"tab-content\">\r\n            <div class=\"table span_4_of_4\">\r\n              <div></div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">HR Email</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.hrEmailId}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Supervisor Email</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.supervisorEmailId}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Casual Leaves</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.cL}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Sick Leaves</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.specialLeave}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Number of Paternity Leaves</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.paternityLeave}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Maternity Leave</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.maternityLeave}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Employment Status</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.status}}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"row even-row\">\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Probation Period End Date</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.probationPeriodEndDate}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\">Notice Period End Date</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\">{{employeeInfo?.employeeHierarchy.noticePeriodEndDate}}</label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-label\"></label>\r\n                </div>\r\n                <div class=\"cell\">\r\n                  <label class=\"text-value\"></label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </section>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" (click)=\"closeAllDialog($event)\" *ngIf=\"getShowEditBasicInfo()\">\r\n  <div class=\"modal-medium\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div class=\"modal-header\">\r\n      <h1>Edit Employee Details</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <a class=\"modal-close-btn modal-close-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"closeAllDialog(null)\"></a>\r\n      <a class=\"save-btn save-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"formGroupBasicInfoForm.ngSubmit.emit()\"></a>\r\n      <form [formGroup]=\"formGroupBasicInfo\" #formGroupBasicInfoForm=\"ngForm\" (ngSubmit)=\"onBasicInfoUpdate()\" method=\"post\">\r\n        <fieldset [disabled]=\"isProcessingInProgress()\">\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Name</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Title*</label>\r\n                  <div class=\"select select-fancy select-fancy-image\">\r\n                    <select formControlName=\"title\">\r\n                          <option value=\"Mr.\">Mr</option>\r\n                          <option value=\"Miss.\">Miss</option>\r\n                          <option value=\"Mrs.\">Mrs</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"empFirstName\" required>\r\n                  <label class=\"text-input-label\">First Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"empMiddleName\" required>\r\n                  <label class=\"text-input-label\">Middle Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"empLastName\" required>\r\n                  <label class=\"text-input-label\">Last Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Identity Details</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\" formGroupName=\"identityDocType\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Identity Doc Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"docTypeId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let docType of identityDocTypes\" value=\"{{docType.docTypeId}}\">{{docType.docTypeName}}</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"identityNumber\" required>\r\n                  <label class=\"text-input-label\">Identity Number</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Contact Information</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"emailId\" required>\r\n                  <label class=\"text-input-label\">Email Id</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"contactNo\" required>\r\n                  <label class=\"text-input-label\">ContactNumber</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Personal Details</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"fatherName\" required>\r\n                  <label class=\"text-input-label\">Father's Name</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Nationality</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"nationality\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let country of countries\" value=\"{{country.countryId}}\">{{country.countryName}}</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Marital status</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"maritalStatus\">\r\n                          <option value=\"MARRIED\">Married</option>\r\n                          <option value=\"SINGLE\">Single</option>\r\n                          <option value=\"DIVORCED\">Divorced</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Sex</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"sex\">\r\n                          <option value=\"MALE\">Male</option>\r\n                          <option value=\"FEMALE\">Female</option>\r\n                          <option value=\"OTHER\">Other</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"dob\" required>\r\n                  <label class=\"text-input-label\">Date of Birth</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <h2 class=\"group-header\">Organization Details</h2>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group\">\r\n                  <input type=\"checkbox\" id=\"isHr\" class=\"default-checkbox span_4_of_4\" formControlName=\"hrFlag\">\r\n                  <label for=\"isHr\">Is Employee an HR?</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group\">\r\n                  <input type=\"checkbox\" id=\"isManager\" class=\"default-checkbox span_4_of_4\" formControlName=\"supervisorFlag\">\r\n                  <label for=\"isManager\">Is Employee a Manager?</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"cell span_2_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Employee Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image span_4_of_4\">\r\n                    <select class=\"span_4_of_4\" formControlName=\"empType\">\r\n                          <option value=\"PERMANENT\">Permanent</option>\r\n                          <option value=\"CONTRACT\">Contract</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" (click)=\"closeAllDialog($event)\" *ngIf=\"getShowDocumentEdit()\">\r\n  <div class=\"modal-medium\">\r\n    <app-spinner *ngIf=\"isProcessingInProgress()\"></app-spinner>\r\n    <div class=\"modal-header\">\r\n      <h1>Edit Employee Documents</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <a class=\"modal-close-btn modal-close-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"closeAllDialog(null)\"></a>\r\n      <a class=\"save-btn save-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"formGroupDocumentForm.ngSubmit.emit()\"></a>\r\n      <form [formGroup]=\"formGroupDocument\" #formGroupDocumentForm=\"ngForm\" (ngSubmit)=\"onDocumentUpdate()\" method=\"post\">\r\n        <fieldset [disabled]=\"isProcessingInProgress()\">\r\n          <div class=\"display-table width-with-right-margin\">\r\n            <div class=\"row\">\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"docId\" required readonly>\r\n                  <label class=\"text-input-label\">Document Id</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group combo-group\">\r\n                  <label class=\"text-input-label\">Document Type</label>\r\n                  <div class=\"select select-fancy select-fancy-image\">\r\n                    <select formControlName=\"docTypeId\">\r\n                          <option value=\"\"></option>\r\n                          <option *ngFor=\"let docType of docTypes\" value=\"{{docType.docTypeId}}\">{{docType.docTypeName}}</option>\r\n                        </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input class=\"inputMaterial\" formControlName=\"remarks\" required>\r\n                  <label class=\"text-input-label\">Remarks</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"cell span_4_of_4\">\r\n                <div class=\"group\">\r\n                  <input type=\"file\" style=\"display:none\" accept=\".pdf\" (change)=\"documentUpload($event)\" #documentFile>\r\n                  <input class=\"inputMaterial\" formControlName=\"documentName\" required (click)=\"documentFile.click()\" readonly>\r\n                  <label class=\"text-input-label\">Document</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal-backdrop\" (click)=\"closeAllDialog($event)\" *ngIf=\"getShowSelectDocumentAlert()\">\r\n  <div class=\"modal-small\">\r\n    <div class=\"modal-header\">\r\n      <h1>Alert</h1>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <a class=\"modal-close-btn modal-close-btn-fixed ripple\" href=\"javascript:void(0)\" (click)=\"closeAllDialog(null)\"></a>\r\n      <div class=\"group center\">\r\n        <h3>Please select a document</h3>\r\n        <div style=\"height:30px;\">\r\n        </div>\r\n        <button type=\"button\" class=\"btn ripple\" (click)=\"closeAllDialog(null)\">OK</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(289);


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticatorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticatorService = (function () {
    function AuthenticatorService(http) {
        this.http = http;
        this.authenticated = false;
    }
    AuthenticatorService.prototype.authenticate = function (loginDetails) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Headers */]({ "Content-Type": "application/json" });
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post("/resources/v1/authentication", JSON.stringify(loginDetails), options)
            .map(function (res) {
            localStorage.setItem("accessToken", res.json().accessToken);
            localStorage.setItem("refreshToken", res.json().refreshToken);
            localStorage.setItem("userName", res.json().userName);
            localStorage.setItem("userDisplayName", res.json().userDisplayName);
        })
            .flatMap(function (res) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Headers */]({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("accessToken") });
            var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
            return _this.http.get("/resources/v1/permission?permissionLevel=view", options)
                .map(function (res) {
                for (var i = 0; i < res.json().length; i++) {
                    localStorage.setItem(res.json()[i].permissionName, "true");
                }
                return res;
            });
        });
    };
    AuthenticatorService.prototype.getAuthenticationStatus = function () {
        return this.authenticated;
    };
    AuthenticatorService.prototype.isAuthorized = function (permission) {
        return (localStorage.getItem(permission) !== null) ? true : false;
    };
    AuthenticatorService.prototype.logout = function () {
        localStorage.clear();
    };
    AuthenticatorService.prototype.setAuthenticationStatus = function (authenticationFlag) {
        this.authenticated = authenticationFlag;
    };
    return AuthenticatorService;
}());
AuthenticatorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthenticatorService);

var _a;
//# sourceMappingURL=authenticator.service.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DepartmentService = (function () {
    function DepartmentService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    DepartmentService.prototype.getDepartments = function (unitId) {
        return this.httpService.callHttpGet("/resources/v1/department?unitId=" + unitId)
            .map(function (res) { return res.json(); });
    };
    return DepartmentService;
}());
DepartmentService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], DepartmentService);

var _a, _b;
//# sourceMappingURL=department.service.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobRoleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JobRoleService = (function () {
    function JobRoleService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    JobRoleService.prototype.getJobRolesByOrgId = function (orgId) {
        return this.httpService.callHttpGet("/resources/v1/jobrole?orgId=" + orgId)
            .map(function (res) { return res.json(); });
    };
    JobRoleService.prototype.getSalaryByJobRoleId = function (jobRoleId) {
        return this.httpService.callHttpGet("/resources/v1/jobrole/" + jobRoleId + "/salary")
            .map(function (res) { return res.json(); });
    };
    JobRoleService.prototype.getOptionalBenefitsByJobRoleId = function (jobRoleId) {
        return this.httpService.callHttpGet("/resources/v1/jobrole/" + jobRoleId + "/optbenefit")
            .map(function (res) { return res.json(); });
    };
    return JobRoleService;
}());
JobRoleService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], JobRoleService);

var _a, _b;
//# sourceMappingURL=job-role.service.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrganizationService = (function () {
    function OrganizationService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    OrganizationService.prototype.getOrganizations = function () {
        return this.httpService.callHttpGet("/resources/v1/organization")
            .map(function (res) { return res.json(); });
    };
    return OrganizationService;
}());
OrganizationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], OrganizationService);

var _a, _b;
//# sourceMappingURL=organization.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnitService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UnitService = (function () {
    function UnitService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    UnitService.prototype.getUnits = function (orgId) {
        return this.httpService.callHttpGet("/resources/v1/unit?organizationId=" + orgId)
            .map(function (res) { return res.json(); });
    };
    return UnitService;
}());
UnitService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], UnitService);

var _a, _b;
//# sourceMappingURL=unit.service.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DistrictService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DistrictService = (function () {
    function DistrictService(httpService) {
        this.httpService = httpService;
    }
    DistrictService.prototype.getDistricts = function (stateId) {
        return this.httpService.callHttpGet("/resources/v1/district?stateId=" + stateId)
            .map(function (res) { return res.json(); });
    };
    return DistrictService;
}());
DistrictService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], DistrictService);

var _a;
//# sourceMappingURL=district.service.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StateService = (function () {
    function StateService(httpService) {
        this.httpService = httpService;
    }
    StateService.prototype.getStates = function (countryId) {
        return this.httpService.callHttpGet("/resources/v1/state?countryId=" + countryId)
            .map(function (res) { return res.json(); });
    };
    return StateService;
}());
StateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], StateService);

var _a;
//# sourceMappingURL=state.service.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomValidator; });
var CustomValidator = (function () {
    function CustomValidator() {
    }
    CustomValidator.noSpace = function (control) {
        if (control.value.indexOf(' ') >= 0)
            return {
                cannotContainSpace: true
            };
        return null;
    };
    CustomValidator.properDate = function (control) {
        var datePattern = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        if (!control.value.match(datePattern)) {
            return { "inValidDate": true };
        }
        return null;
    };
    CustomValidator.validEmail = function (control) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!control.value.match(pattern)) {
            return { "inValidEmail": true };
        }
        return null;
    };
    CustomValidator.validPhone = function (control) {
        var pattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
        if (!control.value.match(pattern)) {
            return { "inValidPhone": true };
        }
        return null;
    };
    CustomValidator.validNumeric = function (control) {
        var pattern = /^\d+$/;
        if (control.value.length > 0 && !control.value.match(pattern)) {
            return { "inValidNumeric": true };
        }
        return null;
    };
    return CustomValidator;
}());

//# sourceMappingURL=custom-validators.js.map

/***/ })

},[533]);
//# sourceMappingURL=main.bundle.js.map