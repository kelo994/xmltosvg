// Application module
var radio = angular.module('radio', ['ngRoute']);

radio.config(function($routeProvider) {

  $routeProvider
  .when('/inicio', {
    templateUrl	: 'plantillas/home.html',
    activetab: 'home',
    controller:'WidgetsController'
    })
  .when('/quiensomos', {
  templateUrl : 'plantillas/who.html',
  activetab: 'who'
    })
    .when('/programm', {
    templateUrl : 'plantillas/programm.html',
    activetab: 'pro',
   controller:'WidgetsController'
  })
  .otherwise({
    redirectTo: '/inicio'
  });
});
radio.controller('mainController', function($scope, $location) {
  $scope.isActive = function(route) {
        return route === $location.path();
    }
    $scope.selectMe = function (event){
   $(event.target).addClass('active');
}

});
radio.controller('WidgetsController', function($scope) {
  $scope.class = "red";
  $scope.changeClass = function(){
    if ($scope.class === "red")
      $scope.class = "blue";
    else
      $scope.class = "red";
  };
  $scope.data = {static: true}
  $scope.panes = [
    { title:"Dynamic Title 1", content:"Dynamic contentzzx 1" },
    { title:"Dynamic Title 2", content:"Dynamic content 2" }
  ];
});
var TabsDemoCtrl = function ($scope) {
  
};
radio.controller('contactController',['$scope','$http','$timeout', function($scope,$http,$timeout){

  $scope.ev = function() {

    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.config.prevent_cache = true;
    scheduler.xy.margin_top=30;
    scheduler.config.first_hour = 9;
    scheduler.config.time_step = 30;
    scheduler.config.event_duration = 120;
    scheduler.config.auto_end_date = true;
    scheduler.config.full_day = true;
    scheduler.config.limit_time_select = true;
    scheduler.config.details_on_dblclick = true;
    scheduler.config.details_on_create = true;
    scheduler.init('scheduler_here',new Date(),"month");
    scheduler.load("plantillas/data/data.json","json");

    scheduler.templates.event_class=function(start, end, event){
      var css = "";
      if(event.subject) // if event has subject property then special class should be assigned
        css += "event_"+event.subject;
      if(event.id == scheduler.getState().select_id){
        css += " selected";
      }
      return css; // default return
    }
    var subject = [
      { key: '', label: 'Appointment' },
      { key: 'science', label: 'Culto' },
      { key: 'math', label: 'Evento Iglesia' },
      { key: 'english', label: 'Invitación' }
    ];
    scheduler.config.lightbox.sections=[
      {name:"Título", height:43, map_to:"text", type:"textarea" , focus:true},
      {name:"Descripción", height:43, map_to:"details", type:"textarea", focus:true},
      {name:"Tipo evento", height:20, type:"select", options: subject, map_to:"subject" },
      {name:"time", height:72, type:"calendar_time", map_to:"auto" }
    ];

  }
  $scope.ev();

  function save() {
    var form = document.forms[0];
    form.action = "plantillas/data/data.json";
    form.elements.data.value = scheduler.toJSON();
    form.submit();
  }
/* function download() {
    var form = document.forms[0];
    form.action = "plantillas/data/data.json";
    form.elements.data.value = scheduler.toJSON();
    form.submit();
  }*/
  $scope.showcal = function(){
  if (scheduler.isCalendarVisible()){
    scheduler.destroyCalendar();
  } else {
    scheduler.renderCalendar({
      position:"dhx_minical_icon",
      date:scheduler._date,
      navigation:true,
      handler:function(date,calendar){
        scheduler.setCurrentView(date);
        scheduler.destroyCalendar()
      }
    });
  }
}
}]);

radio.controller("DbController",['$scope','$http', function($scope,$http){

  Object.defineProperty($scope, "queryFilter", {
     get: function() {
         var out = {};
         out[$scope.queryBy || "$"] = $scope.query;
         return out;
     }
 });
  // Function to get employee details from the database
  getInfo();
  function getInfo(){
    // Sending request to EmpDetails.php files
    $http.post('databaseFiles/empDetails.php').success(function(data){
      // Stored the returned data into scope
      $scope.details = data;
      var now = new Date();
      var nowYear = now.getYear()+1900;
      var nowMonth = now.getMonth()+1;
      var nowDay = now.getDate();
      $scope.details.edad = 0;
      $scope.details.cump = false;
      for(i=0;i<$scope.details.length;i++){
        if($scope.details[i].fechanac!=""&&$scope.details[i].fechanac!=null){
          var values = $scope.details[i].fechanac.split("-");
          var dia = values[0];
          var mes = values[1];
          var year = values[2];
          var edad = nowYear - year;
          if(nowMonth < mes){
            edad--;
          }
          if((nowMonth == mes)&&(nowDay < dia)){
            edad--;
            $scope.details[i].cump = true;
          }
          if((nowMonth == mes)&&(nowDay == dia)||(nowMonth == mes)&&(nowDay > dia)){
            $scope.details[i].cump = true;
          }
          if (nowMonth > mes) {

          }
            $scope.details[i].edad = edad;
        }
      }
    });
  }
  // Setting default value of gender
  $scope.empInfo = {'genero' : 'male'};
  // Enabling show_form variable to enable Add employee button
  $scope.show_form = true;

  $scope.close = function(){
    $('#myModalView').modal('hide');
  }
  // Function to add toggle behaviour to form
  $scope.formToggle = function(){
    $('#myModal').on('hidden.bs.modal', function(){
		$(this).find('form')[0].reset(); //para borrar todos los datos que tenga los input, textareas, select.
		$("label.error").remove();  //lo utilice para borrar la etiqueta de error del jquery validate
	});

    $('#empForm').slideToggle();
  }
    $scope.viewInfo = function (info) {
    $scope.currentUser = info;

    $('#viewForm').slideToggle();
  }
  $scope.resetEdit = function(){
    $('#myModalEdit').on('hidden.bs.modal', function(){
		$(this).find('form')[0].reset(); //para borrar todos los datos que tenga los input, textareas, select.
		$("label.error").remove();  //lo utilice para borrar la etiqueta de error del jquery validate
    alert('reset success');
	});
  }

  $scope.currentUser = {};
  $scope.confirmDelete = function (info) {
    $scope.currentUser = info;
    $('#empDelete').slideToggle();
    // body...
  }
  $scope.insertInfo = function(info){

    if((info.rel=='' || info.rel==null)||(info.rel=="false")){
      info.rel="false";
    }else{
      info.rel="true";
    }
    if(info.asig=='' || info.asig==null){
      info.asig = "Sin asignar";
    }
    $http.post('databaseFiles/insertDetails.php',{"fname":info.fname,"ape":info.ape,"apo":info.apo,"genre":info.genre,"nac":info.nac,"dir":info.dir,
    "birth":info.birth,"phone":info.phone,"mail":info.mail,"fb":info.fb,"pic":info.pic,"sal":info.sal,"ocu":info.ocu,"rel":info.rel,"par":info.par,
    "inter":info.inter,"asp":info.asp,"lik":info.lik,"disl":info.disl,"wlive":info.wlive,"ans":info.ans,"igl":info.igl,"dif":info.dif,
    "desc":info.desc,"asig":info.asig}).success(function(data){

      getInfo();

        $("#myModal").modal("hide")
    });

  }
  $scope.deleteInfo = function(info){

    $http.post('databaseFiles/deleteDetails.php',{"del_id":info.id}).success(function(data){
      if (data == true) {
        getInfo();
          $("#confirmDelete").modal("hide")
      }
    });
  }
  $scope.editInfo = function(info){
    info.nameEdit = info.nombre;
    info.apeEdit = info.apellido;
    info.apoEdit = info.apodo;
    info.genreEdit = info.genero;
    info.nacEdit = info.nacionalidad;
    info.dirEdit = info.direccion;
    info.birthEdit = info.fechanac;
    info.phoneEdit = info.fono;
    info.mailEdit = info.correo;
    info.facEdit = info.faceb;
    info.picEdit = info.foto;
    if(info.salud=='' || info.salud==null|| info.salud==' '){
      info.salEdit=info.salud;
      info.flagSal = false;
    }else {
      info.flagSal = true;
    }
    info.ocuEdit = info.ocupac;
    if((info.relacion=='' || info.relacion==null)||(info.relacion=="false")){
     info.flag=false;
   }else {
     info.flag= true;
   }
   info.parEdit = info.pareja;
   info.interEdit = info.interes;
   info.aspEdit = info.desire;
   info.likEdit = info.likes;
   info.dislEdit = info.dislikes;
   info.wliveEdit=info.wholive;
   info.ansEdit = info.answers;
   info.iglEdit = info.church;
   info.difEdit = info.hard;
   info.descEdit = info.descripcion;
   info.asigEdit = info.assign;
    $scope.currentUser = info;

    $scope.close();
    $('#editForm').slideDown();
  }

  $scope.UpdateInfo = function(info){
    if(info.nameEdit=='' || info.nameEdit==null){
      info.nameEdit=info.nombre;
    }
    if(info.apeEdit=='' || info.apeEdit==null){
      info.apeEdit=info.apellido;
    }

    if(info.flagSal=='' || info.flagSal==null){
      info.salEdit=info.salud;
    }
    if(info.flagSal==false){
      info.salEdit= " ";

    }

    if(info.ocuEdit=='' || info.ocuEdit==null){
      info.ocuEdit=info.ocupac;
    }
    if(info.flag=='' || info.flag==null){
      info.relEdit=info.relacion;
    }
    if(info.flag==false){
      info.relEdit = "false";
      info.parEdit= " ";
    }
    if(info.flag==true){
      info.relEdit = "true";
    }


    var nombre = info.nameEdit;

    $http.post('databaseFiles/updateDetails.php',{"id":info.id,"fname":info.nameEdit,"ape":info.apeEdit,"apo":info.apoEdit,"genre":info.genreEdit,
    "nac":info.nacEdit,"dir":info.dirEdit,"birth":info.birthEdit,"phone":info.phoneEdit,"mail":info.mailEdit,"fb":info.facEdit,
    "pic":info.picEdit,"sal":info.salEdit,"ocu":info.ocuEdit,"rel":info.relEdit,"par":info.parEdit,"inter":info.interEdit,"asp":info.aspEdit,
    "lik":info.likEdit,"disl":info.dislEdit,"wlive":info.wliveEdit,"ans":info.ansEdit,"igl":info.iglEdit,"dif":info.difEdit,
    "desc":info.descEdit,"asig":info.asigEdit}).success(function(data){
        getInfo();
        $("#myModalEdit").modal("hide");
        $('#dataTable').css('display', 'none')
        $('#dataTable').slideToggle();
          });
  }
  $scope.updateMsg = function(emp_id){
    $('#editForm').css('display', 'none');
    $("#myModalEdit").modal("hide");

  }

  $scope.calculaEdad = function(){

  }
}]);
