$(document).ready(function () {
  $("#txtcommunityHallId").hide();
  var HostpitalTable;
  $("#placeOfBirth1").hide();
  // $("#placeOfBirth1").attr("disabled", "disabled");
  $("#placeOfHospital").hide();
  $("#placeOfHospital").attr("disabled");
  $("#birth-place-option2").on("change", function () {
    $("#placeOfBirth").hide();
    $("#placeOfBirth").attr("disabled", "disabled");
    $("#placeOfBirth1").show();
    // $("#placeOfBirth1").removeAttr("disabled");

    $("#placeOfHospital").show();
    $("#placeOfHospital").removeAttr("disabled");
    $("#placeOfDeath").hide();
    $("#placeOfDeath").attr("disabled", "disabled");

    $.ajax({
      type: "get",
      datatype: "json",
      processData: false,
      url: "https://chennaicorporation.gov.in/gcc/js/hospital-list.json",
      success: function (response) {
        console.log("hospital-list", response);
        HostpitalTable = $("#HostpitalTable").DataTable({
          data: JSON.parse(response),
          columns: [
            { data: "hospital_name" },
            { data: "address" },
            { data: "" },
          ],
          language: {
            searchPlaceholder: "Quick search...",
          },
          aaSorting: [[0, "asc"]],
          bPaginate: true,
          bFilter: true,
          bInfo: false,
          bSortable: true,
          bRetrieve: true,
          columnDefs: [
            {
              targets: -1,
              data: null,
              defaultContent:
                '<button type="button" class="btn btn-default" data-dismiss="modal">Show</button>',
            },
          ],
        });
        $(".dataTables_filter input").addClass("form-control");
        $(".dataTables_length").hide();
      },
    });
  });
  $("#HostpitalTable tbody").on("click", "button", function () {
    var data = HostpitalTable.row($(this).parents("tr")).data();
    $(".hospital_name").val(data.hospital_name);
  });
  $("#birth-place-option3").on("change", function () {
    $("#placeOfBirth1").hide();
    //$("#placeOfBirth1").attr("disabled", "disabled");
    $("#placeOfBirth").hide();
    $("#placeOfBirth").attr("disabled", "disabled");
    $("#placeOfHospital").hide();
    $("#placeOfHospital").attr("disabled");
    $("#placeOfDeath").hide();
    //  $("#placeOfDeath").attr("disabled", "disabled");
  });
  $("#birth-place-option1").on("change", function () {
    $("#placeOfBirth1").hide();
    // $("#placeOfBirth1").attr("disabled", "disabled");
    $("#placeOfBirth").show();
    $("#placeOfBirth").removeAttr("disabled", "disabled");
    $("#placeOfDeath").show();
    //$("#placeOfDeath").removeAttr("disabled");
    $("#placeOfHospital").hide();
    $("#placeOfHospital").attr("disabled", "disabled");
  });

  $(".advancedBirthCertificate").validate({
    rules: {
      registrationNumber: {
        required: false,
      },
      registrationNumber1: {
        required: false,
      },
      registrationNumber2: {
        required: false,
      },
      registrationNumber3: {
        required: false,
      },
      childName: {
        required: false,
      },
      sel_month: {
        required: true,
      },
      sel_day: {
        required: true,
      },
      sel_year: {
        required: true,
      },
      regcaptchNo: {
        required: true,
      },
      selectGender: {
        required: true,
      },
      place_birth: {
        required: function (element) {
          if ($('[name="birth-place"]').val() == "Hospital") {
            return false;
          } else {
            return true;
          }
        },
      },
      nameOfFather: {
        required: false,
      },
      nameOfMother: {
        required: false,
      },
    },
    messages: {
      registrationNumber: "Enter Registration Number",
      childName: "Enter Child Name",
      sel_month: "Choose Month",
      sel_day: "Choose Day",
      sel_year: "Choose Year",
      selectGender: "Choose selectGender",
      regcaptchNo: "Enter verification number",
      place_birth: "Choose Hospital",
      nameOfFather: "Enter Father Name",
      nameOfMother: "Enter Mother Name",
    },
    submitHandler: function (form) {
      var year = $("#sel_year").val();
      var month = $("#sel_month").val();
      var day = $("#sel_day").val();
      $("#selectGender").val();
      $(".custom-error").html("");

      $("#dateOfBirth").val(year + "-" + month + "-" + day);
      var dateOfBirth = $("#dateOfBirth").val();
      console.log("dateOfBirth", dateOfBirth);
      var regcaptchNo = $("#regcaptchNo").val();
      var txtCaptcha_t = $("#txtCaptcha_t").val();
      if (txtCaptcha_t !== regcaptchNo) {
        $(".number-verification-text").append(
          '<label id="regcaptchNo-error" class="custom-error error" for="regcaptchNo">Invalid verification number</label>'
        );
        return false;
      }
      var regex = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/g;
      if (!regex.test(dateOfBirth) && dateOfBirth != "--") {
        $(".dob-select").append(
          '<label  class="custom-error error" >Invalid Date of Birth</label>'
        );
        return false;
      }

      var selectGender = $("#selectGender").val();

      if (selectGender == "") {
        $(".selectGender-list").append(
          '<label  class="custom-error error" >Choose selectGender</label>'
        );
        return false;
      }

      return true;
    },
  });

  $(".basicBirthForm").validate({
    rules: {
      sel_month: {
        required: true,
      },
      sel_day: {
        required: true,
      },
      sel_year: {
        required: true,
      },
      regcaptchNo: {
        required: true,
      },
      Gender: {
        required: true,
      },
      rd_bd_type: {
        required: false,
      },
      cb_hosp: {
        required: false,
      },

      place_birth: {
        required: function (element) {
          if ($('[name="cb_hosp"]').val() == "Hospital") {
            return false;
          } else {
            return true;
          }
        },
      },
    },
    messages: {
      sel_month: "Choose Month",
      sel_day: "Choose Day",
      sel_year: "Choose Year",
      gender: " Select Gender",
      regcaptchNo: "Enter verification number",
      place_birth: "Choose Hospital",
    },
    submitHandler: function (form) {
      var year = $("#sel_year").val();
      var month = $("#sel_month").val();
      var day = $("#sel_day").val();
      $("#selectGender").val();
      $(".custom-error").html("");

      $("#dateOfBirth").val(year + "-" + month + "-" + day);
      var dateOfBirth = $("#dateOfBirth").val();
      console.log("dateOfBirth", dateOfBirth);
      var regcaptchNo = $("#regcaptchNo").val();
      var txtCaptcha_t = $("#txtCaptcha_t").val();
      if (txtCaptcha_t !== regcaptchNo) {
        $(".number-verification-text").append(
          '<label id="regcaptchNo-error" class="custom-error error" for="regcaptchNo">Invalid verification number</label>'
        );
        return false;
      }
      var regex = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/g;
      if (!regex.test(dateOfBirth) && dateOfBirth != "--") {
        $(".dob-select").append(
          '<label  class="custom-error error" >Invalid Date of Birth</label>'
        );
        return false;
      }

      var selectGender = $("#selectGender").val();

      if (selectGender == "") {
        $(".selectGender-list").append(
          '<label  class="custom-error error" >Choose selectGender</label>'
        );
        return false;
      }

      return true;
    },
  });

  $(".basicDeathCertForm").validate({
    rules: {
      sel_month: {
        required: true,
      },
      sel_day: {
        required: true,
      },
      sel_year: {
        required: true,
      },
      regcaptchNo: {
        required: true,
      },
      Gender: {
        required: true,
      },
      place_birth: {
        required: function (element) {
          if ($("#place_birth").val() == "Hospital") {
            return false;
          } else {
            return true;
          }
        },
      },
    },
    messages: {
      sel_month: "Choose Month",
      sel_day: "Choose Day",
      sel_year: "Choose Year",
      Gender: "Choose selectGender",
      regcaptchNo: "Enter verification number",
      place_birth: "Choose Hospital",
    },
    submitHandler: function (form) {
      var year = $("#sel_year").val();
      var month = $("#sel_month").val();
      var day = $("#sel_day").val();
      $("#Gender").val();
      $(".custom-error").html("");

      $("#dateOfDeath").val(year + "-" + month + "-" + day);

      var dateOfDeath = $("#dateOfDeath").val();
      console.log("dateOdateOfDeathfBirth", dateOfDeath);
      var regex = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/g;
      if (!regex.test(dateOfDeath) && dateOfDeath != "--") {
        $(".dob-select").append(
          '<label  class="custom-error error" >Invalid Date of Birth</label>'
        );
        return false;
      }

      var captchavalue = $("#captchavalue").val();
      var txtCaptcha_t = $("#txtCaptcha_t").val();
      if (txtCaptcha_t !== captchavalue) {
        $(".number-verification-text").append(
          '<label id="regcaptchNo-error" class="custom-error error" for="regcaptchNo">Invalid verification number</label>'
        );
        return false;
      }
      return true;
    },
  });

  $(".advancedDeathForm").validate({
    rules: {
      registrationNumber: {
        required: false,
      },
      registrationNumber1: {
        required: false,
      },
      registrationNumber2: {
        required: false,
      },
      registrationNumber3: {
        required: false,
      },

      childName: {
        required: false,
      },
      sel_month: {
        required: true,
      },
      sel_day: {
        required: true,
      },
      sel_year: {
        required: true,
      },
      regcaptchNo: {
        required: true,
      },
      selectGender: {
        required: true,
      },
      placeOfHospital: {
        required: function (element) {
          if ($("#selectPlace").val() == "Hospital") {
            return false;
          } else {
            return true;
          }
        },
      },
      nameOfFather: {
        required: false,
      },
      nameOfMother: {
        required: false,
      },
    },
    messages: {
      registrationNumber: "Enter Registration Number",
      childName: "Enter Child Name",
      sel_month: "Choose Month",
      sel_day: "Choose Day",
      sel_year: "Choose Year",
      selectGender: "Choose selectGender",
      regcaptchNo: "Enter verification number",
      place_birth: "Choose Hospital",
      nameOfFather: "Enter Father Name",
      nameOfMother: "Enter Mother Name",
    },
    submitHandler: function (form) {
      var year = $("#sel_year").val();
      var month = $("#sel_month").val();
      var day = $("#sel_day").val();
      $("#selectGender").val();
      $(".custom-error").html("");

      $("#dateOfDeath").val(year + "-" + month + "-" + day);
      var dateOfDeath = $("#dateOfDeath").val();
      console.log("dateOfBdateOfDeathirth", dateOfDeath);
      var regex = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/g;
      if (!regex.test(dateOfDeath) && dateOfDeath != "--") {
        $(".dob-select").append(
          '<label  class="custom-error error" >Invalid Date of Birth</label>'
        );
        return false;
      }

      var selectGender = $("#selectGender").val();

      if (selectGender == "") {
        $(".selectGender-list").append(
          '<label  class="custom-error error" >Choose selectGender</label>'
        );
        return false;
      }
      var regcaptchNo = $("#regcaptchNo").val();
      var txtCaptcha_t = $("#txtCaptcha_t").val();
      if (txtCaptcha_t !== regcaptchNo) {
        $(".number-verification-text").append(
          '<label id="regcaptchNo-error" class="custom-error error" for="regcaptchNo">Invalid verification number</label>'
        );
        return false;
      }

      return true;
    },
  });

  $(".propertyTaxOnlinePayment").validate({
    rules: {
      zoneCode: {
        required: true,
      },
      divisionCode: {
        required: true,
      },
      billNo: {
        required: true,
      },
      subBillNo: {
        required: false,
      },
    },
    messages: {
      zoneCode: "Choose Zone",
      divisionCode: "Choose Division Code",
      billNo: "Enter Bill Number",
      subBillNo: "Enter Sub Number",
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $(".propertyTaxStatus").validate({
    rules: {
      zoneCode: {
        required: true,
      },
      divisionCode: {
        required: true,
      },
      billNo: {
        required: true,
      },
      subBillNo: {
        required: false,
      },
    },
    messages: {
      zoneCode: "Choose Zone",
      divisionCode: "Choose Division Code",
      billNo: "Enter Bill Number",
      subBillNo: "Enter Sub Number",
    },
    submitHandler: function (form) {
      return true;
    },
  });
  $(".property-tax-receipt").validate({
    rules: {
      zoneCode: {
        required: true,
      },
      divisionCode: {
        required: true,
      },
      billNo: {
        required: true,
      },
      subBillNo: {
        required: false,
      },
    },
    messages: {
      zoneCode: "Choose Zone",
      divisionCode: "Choose Division Code",
      billNo: "Enter Bill Number",
      subBillNo: "Enter Sub Number",
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $("#child-inclusion").validate({
    rules: {
      country_code: {
        required: true,
        maxlength: 3,
      },
      txt_mob: {
        required: true,
        maxlength: 10,
      },
      otpnumber: {
        required: true,
      },
    },
    messages: {
      country_code: "Enter C.code",
      mobile_num: "Enter Mobile Number",
      otpnumber: "Enter OTP",
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $("#profession-tax-calculator-from input[type=radio]").change(function () {
    $("#profession-tax-calculator-from").find("tr").removeClass("activeRow");
    $("#profession-tax-calculator-from")
      .find("tr")
      .find("input[type=text]")
      .attr("disabled", "disabled");

    var rootRow = $(this).parent().parent().parent();
    $(rootRow).addClass("activeRow");
    $("#profession-tax-calculator-from")
      .find(".activeRow")
      .find("input[type=text]")
      .removeAttr("disabled", "disabled");
  });
  $("#PropertTaxzoneCode").change(function () {
    var zone = $(this).val();
    if (zone === "") {
      return false;
    }

    $.ajax({
      type: "get",
      url:
        "https://chennaicorporation.gov.in/online-civic-services/editPropertytaxpayment.do?do=getNewDivisions&zoneid=" +
        zone,
      success: function (response) {
        var divisionOptions = response.split("$$");
        $("#PropertTaxdivisionCode").empty();
        $("#PropertTaxdivisionCode").append(
          ' <option value="">--Select--</option>'
        );
        $.each(divisionOptions, function (index, value) {
          console.log("value", value);
          if (value != "") {
            var val = value.split("#");
            $("#PropertTaxdivisionCode").append(
              "<option value='" + val[0] + "'>" + val[1] + " </option>"
            );
          }
        });
      },
    });
  });

  $("#profession-tax-calculator-from").validate({
    rules: {},
    messages: {},
    submitHandler: function (form) {
      $(".calculate-error")
        .addClass("d-none")
        .text("Choose any yearly income range");
      if ($("#profession-tax-calculator-from").find(".activeRow").length == 0) {
        $(".calculate-error")
          .removeClass("d-none")
          .text("Choose any one Employer");
        return false;
      }
      var activeRowInputs = $("#profession-tax-calculator-from")
        .find(".activeRow")
        .find("input[type=text]");
      var required = 0;
      activeRowInputs.each(function (index) {
        $(this).removeClass("errorBorder");
        if ($(this).val() == "") {
          $(this).focus();
          $(this).addClass("errorBorder");
          $(".calculate-error").removeClass("d-none").text("Fill this field");
          required++;
          return false;
        }
        console.log(index + ": " + $(this).val());
      });
      if (required !== 0) {
        return false;
      }
      return true;
    },
  });

  $("#tree-planet-form").validate({
    rules: {
      name: {
        required: true,
      },
      address: {
        required: true,
      },
      countrycode: {
        required: true,
      },
      contacno: {
        required: true,
      },
      contacno1: {
        required: true,
      },
      emailid: {
        required: true,
      },
      contacno2: {
        required: true,
      },
    },
    messages: {
      name: "Enter Name",
      address: "Enter Address",
      countrycode: "Enter code",
      contacno: "Enter Mobile Number",
      contacno1: "Enter Mobile Number",
      contacno2: "Enter Mobile Number2",
      emailid: "Enter Email Address",
      txt_rem: "Enter Comment",
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $("#feedback-form").validate({
    rules: {
      txt_name: {
        required: true,
      },
      sel_dept: {
        required: true,
      },
      // 'countrycode': {
      //   required: true
      // },
      txt_mobile: {
        required: true,
      },
      txt_email: {
        required: true,
      },
      txt_rem: {
        required: true,
      },
    },
    messages: {
      txt_name: "Enter Name",
      sel_dept: "Choose Dept",
      // countrycode: "Enter code",
      txt_mobile: "Enter Mobile Number",
      txt_email: "Enter Email Address",
      txt_rem: "Enter Comment",
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $("#FrmFindLoc").validate({
    rules: {
      subtxt_areano: {
        required: true,
      },
      txt_location: {
        required: false,
      },
      txt_street: {
        required: false,
      },
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $(".newBillSearch").validate({
    rules: {
      zoneCode: {
        required: true,
      },
      divisionCode: {
        required: true,
      },
      billNo: {
        required: true,
      },
      subBillNo: {
        required: false,
      },
    },
    messages: {
      zoneCode: "Choose Zone",
      divisionCode: "Choose Division Code",
      billNo: "Enter Bill Number",
      subBillNo: "Enter Sub Number",
    },
    submitHandler: function (form) {
      return true;
    },
  });
  $(".getDivision").change(function () {
    $("#divs").remove();
    $("#emptryDiv").show();
    $("#emptyChall").show();
    $("#cb_communityHallId").remove();
    var zone = $(this).val();
    if (zone === "") {
      return false;
    }
    $.ajax({
      type: "get",
      url: "https://chennaicorporation.gov.in/admin/divs_ajax.jsp?ZONE=" + zone,
      success: function (response) {
        console.log("response", response);
        $("#emptryDiv").hide();
        $(".divistionList").append(response);
        $(".divistionList")
          .find("select")
          .addClass("form-control form-control choose-field");
      },
    });
  });

  $("#hall-booking").validate({
    rules: {
      zone: {
        required: true,
      },
      divs: {
        required: true,
      },
      cb_communityHallId: {
        required: true,
      },
      sel_month: {
        required: true,
      },
      sel_year: {
        required: true,
      },
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $("#Muvaloor-form-1").validate({
    rules: {
      ack_no: {
        required: true,
      },
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $(".volunteerUpdateForm").validate({
    rules: {
      txt_mob: {
        required: true,
      },
    },
    submitHandler: function (form) {
      return true;
    },
  });

  $("#volunteer-form").validate({
    rules: {
      cb_cat: {
        required: true,
      },
      cb_sub_cat: {
        required: true,
      },
      txt_name: {
        required: true,
      },
      txt_email: {
        required: true,
      },
      txt_dob: {
        required: true,
      },
      txt_sex: {
        required: true,
      },
      txt_mob: {
        required: true,
      },
      txt_addr: {
        required: true,
      },
      txt_pin: {
        required: true,
      },
      chk_ill: {
        required: true,
      },
      txt_ill_del: {
        required: true,
      },
      txt_edu: {
        required: true,
      },
      txt_empmt: {
        required: true,
      },
      rd_inv_crim: {
        required: true,
      },
      rd_prv_vol: {
        required: true,
      },
      txt_wkr_are: {
        required: true,
      },
    },

    submitHandler: function (form) {
      return true;
    },
  });

  $("#zone").change(function () {
    var zone = $(this).val();
    if (zone === "") {
      return false;
    }
    $(".empty-line-select").hide();
    $(".lineNumber").find("select").remove();
    $(".empty_area-line-select").show();
    $("#area").remove();
    $("#divs").remove();
    $.ajax({
      type: "get",
      url:
        "https://chennaicorporation.gov.in/moovaloor/mis_divs_ajax.jsp?ZONEID=" +
        zone,
      success: function (response) {
        console.log("response", response);
        $("#divs").remove();
        $(".lineNumber").append(response);
        $(".lineNumber")
          .find("#divs")
          .addClass("form-control form-control choose-field");
      },
    });
  });
});

function DrawCaptcha() {
  var a = Math.ceil(Math.random() * 10) + "";
  var b = Math.ceil(Math.random() * 10) + "";
  var c = Math.ceil(Math.random() * 10) + "";
  var d = Math.ceil(Math.random() * 10) + "";
  var e = Math.ceil(Math.random() * 10) + "";
  var f = Math.ceil(Math.random() * 10) + "";
  var g = Math.ceil(Math.random() * 10) + "";
  var code = a + "" + b + "" + "" + c + "" + d + "" + e + "" + f + "" + g;
  code = removeSpaces(code);
  console.log("code", code);
  $("#txtCaptcha").val(code);
  $("#txtCaptcha_t").val(code);
  $("#txtCaptcha_span").text(code);
}
$(window).on("load", function () {
  DrawCaptcha();
});
function removeSpaces(string) {
  return string.split(" ").join("");
}

function showOption(obj) {
  if (obj.value == 2) {
    $("#showtheOption1").hide();
    $("#showtheOption2").show();
  } else if (obj.value == 0) {
    $("#showtheOption1").hide();
    $("#showtheOption2").hide();
  } else {
    $("#showtheOption1").show();
    $("#showtheOption2").hide();
  }
}

function fn_divs(e) {
  console.log("thisthisthis", $(e).val());
  $("#cb_communityHallId").remove();
  $("#emptyChall").show();
  var divs = $(e).val();
  if (divs === "") {
    return false;
  }
  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/onlinebooking/communityhall_ajax.jsp?DIVS=" +
      divs,
    success: function (response) {
      console.log("response", response);
      $("#emptyChall").hide();
      $(".comHallList").append(response);
      $(".comHallList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
}

function fn_getareas(e) {
  var divs = $("#divs").val();

  var zoneid = $("#zone").val();
  $("#locationList").remove();

  var divs = $(e).val();
  if (divs === "") {
    return false;
  }
  if (zoneid === "") {
    return false;
  }
  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/moovaloor/mis_area_ajax.jsp?ZONEID=" +
      zoneid +
      "&DIVID=" +
      divs,
    success: function (response) {
      console.log("response", response);

      $(".locationList").append(response);
      $(".locationList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
}

// date picker

$(document).ready(function () {
  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear() + "-" + month + "-" + day;

  $("#scl_ADate").val(today);

  //   $('#appln_date').val(today);
  $("#test").click(function () {
    testClicked();
  });
});
function testClicked() {
  console.log($("#scl_ADate").val());
}

$("#FrmFindLoc").validate({
  rules: {
    txt_area: {
      required: true,
    },
    txt_location: {
      required: true,
    },
    txt_street: {
      required: true,
    },
  },
  submitHandler: function (form) {
    return true;
  },
});
$("#property-tax-online-payment").validate({
  rules: {
    zoneNo: {
      required: true,
    },
    wardNo: {
      required: true,
    },
    propertyId: {
      required: true,
    },
    subNo: {
      required: false,
    },
  },
  messages: {
    zoneNo: "Choose Zone",
    wardNo: "Choose Division Code",
    propertyId: "Enter Bill Number",
    // subNo: "Enter Sub Number",
  },
  submitHandler: function (form) {
    document.getElementById("iframe").style.display = "block";

    return true;
  },
});
$("#property-tax-payment-status").validate({
  rules: {
    zoneNo: {
      required: true,
    },
    wardNo: {
      required: true,
    },
    propertyId: {
      required: true,
    },
    subNo: {
      required: false,
    },
  },
  messages: {
    zoneNo: "Choose Zone",
    wardNo: "Choose Division Code",
    propertyId: "Enter Bill Number",
    subNo: "Enter Sub Number",
  },
  submitHandler: function (form) {
    document.getElementById("iframe").style.display = "block";

    return true;
  },
});
$("#property-tax-payment-receipt").validate({
  rules: {
    zoneNo: {
      required: true,
    },
    wardNo: {
      required: true,
    },
    propertyId: {
      required: true,
    },
    subNo: {
      required: false,
    },
  },
  messages: {
    zoneNo: "Choose Zone",
    wardNo: "Choose Division Code",
    propertyId: "Enter Bill Number",
    subNo: "Enter Sub Number",
  },
  submitHandler: function (form) {
    document.getElementById("iframe").style.display = "block";

    return true;
  },
});

$(".newBillSearch").validate({
  rules: {
    zoneCode: {
      required: true,
    },
    divisionCode: {
      required: true,
    },
    billNo: {
      required: true,
    },
    subBillNo: {
      required: false,
    },
  },
  messages: {
    zoneCode: "Choose Zone",
    divisionCode: "Choose Division Code",
    billNo: "Enter Bill Number",
    subBillNo: "Enter Sub Number",
  },
  submitHandler: function (form) {
    return true;
  },
});
$(".getDivision").change(function () {
  $("#divs").remove();
  $("#emptryDiv").show();
  $("#emptyChall").show();
  $("#cb_communityHallId").remove();
  var zone = $(this).val();
  if (zone === "") {
    return false;
  }
  $.ajax({
    type: "get",
    url: "https://chennaicorporation.gov.in/admin/divs_ajax.jsp?ZONE=" + zone,
    success: function (response) {
      console.log("response", response);
      $("#emptryDiv").hide();
      $(".divistionList").append(response);
      $(".divistionList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
});

$("#hall-booking").validate({
  rules: {
    zone: {
      required: true,
    },
    divs: {
      required: true,
    },
    cb_communityHallId: {
      required: true,
    },
    sel_month: {
      required: true,
    },
    sel_year: {
      required: true,
    },
  },
  submitHandler: function (form) {
    return true;
  },
});

$("#Muvaloor-form-1").validate({
  rules: {
    ack_no: {
      required: true,
    },
  },
  submitHandler: function (form) {
    return true;
  },
});

$("#NewBillSearchZone").change(function () {
  var zone = $(this).val();
  if (zone === "") {
    return false;
  }

  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/online-civic-services/editPropertytaxpayment.do?do=getDivisions&zoneid=" +
      zone,
    success: function (response) {
      var divisionOptions = response.split("$$");
      $("#NewBillSearchDivision").empty();
      $("#NewBillSearchDivision").append(
        ' <option value="">--Select--</option>'
      );
      $.each(divisionOptions, function (index, value) {
        console.log("value", value);
        if (value != "") {
          var val = value.split("#");
          $("#NewBillSearchDivision").append(
            "<option value='" + val[0] + "'>" + val[1] + " </option>"
          );
        }
      });
    },
  });
});

$("#cb_cat").change(function () {
  var cat = $(this).val();
  if (cat == 0) {
    $("#cb_sub_catTag").empty();
    $("#cb_sub_catTag").append(
      '<select name="cb_sub_cat" class="form-control place-birth-area blank-select" id="cb_sub_cat"> <option value="0"> Select </option></select>'
    );
  }

  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/relief_2016/div_sub_cat.jsp?CAT=" +
      cat,
    success: function (response) {
      $("#cb_sub_catTag").empty();
      $("#cb_sub_catTag").append(response);
      $("#cb_sub_cat").addClass("form-control form-control choose-field");
    },
  });
});

$("#mrg_date").change(function () {
  var mrg_date = moment($(this).val(), "YYYY-MM-DD").format(
    this.getAttribute("data-date-format")
  );
  var url =
    "https://chennaicorporation.gov.in/moovaloor/mis_marry_date_check_ajax.jsp?M_DATE=" +
    mrg_date;

  $.ajax({
    type: "get",
    url: url,
    success: function (response) {
      console.log("response", response.trim().length);
      if (response.trim().length !== 0) {
        $.confirm({
          title: "",
          content: response,
          buttons: {
            close: {
              btnClass: "confirm-cancel",
              text: "Close",
              action: function () {},
            },
          },
        });
      }
    },
  });
});

$("#m_dob").change(function () {
  var m_dob = moment($(this).val(), "YYYY-MM-DD").format(
    this.getAttribute("data-date-format")
  );
  var mrg_date = moment($("#mrg_date").val(), "YYYY-MM-DD").format(
    this.getAttribute("data-date-format")
  );
  var url =
    "https://chennaicorporation.gov.in/moovaloor/mis_age_find_ajax.jsp?DOB=" +
    m_dob +
    "&M_DATE=" +
    mrg_date;

  $.ajax({
    type: "get",
    url: url,
    success: function (response) {
      console.log("response", response);
      if (response.trim().includes("Date value Error")) {
        $.confirm({
          title: "",
          content: response,
          buttons: {
            close: {
              btnClass: "confirm-cancel",
              text: "Close",
              action: function () {},
            },
          },
        });
      } else {
        $("#age-bride").val(response.trim());
      }
    },
  });
});

$("#man_dob").change(function () {
  var man_dob = moment($(this).val(), "YYYY-MM-DD").format(
    this.getAttribute("data-date-format")
  );
  var mrg_date = moment($("#mrg_date").val(), "YYYY-MM-DD").format(
    this.getAttribute("data-date-format")
  );
  var url =
    "https://chennaicorporation.gov.in/moovaloor/mis_age_find_ajax.jsp?DOB=" +
    man_dob +
    "&M_DATE=" +
    mrg_date;
  $.ajax({
    type: "get",
    url: url,
    success: function (response) {
      console.log("response", response);
      if (response.trim().includes("Date value Error")) {
        $.confirm({
          title: "",
          content: response,
          buttons: {
            close: {
              btnClass: "confirm-cancel",
              text: "Close",
              action: function () {},
            },
          },
        });
      } else {
        $("#man_age").val(response.trim());
      }
    },
  });
});

$("#zone").change(function () {
  var zone = $(this).val();
  if (zone === "") {
    return false;
  }
  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/moovaloor/mis_divs_ajax.jsp?ZONEID=" +
      zone,
    success: function (response) {
      console.log("response", response);

      $(".areaList").append(response);
      $(".areaList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
});

$("#Muvaloor-application-form").validate({
  rules: {
    appln_date: {
      required: false,
      number: false,
    },
    apl_name: {
      required: false,
    },
    manapen_name: {
      required: false,
    },
    zone: {
      required: false,
    },
    divs: {
      required: false,
    },
    ass_const: {
      required: false,
    },
    area: {
      required: false,
    },
    loc: {
      required: false,
    },
    door_no: {
      required: false,
    },
    sel_street: {
      required: false,
    },
    mobile_no: {
      required: false,
    },
    manapen_amma: {
      required: false,
    },
    manapen_appa: {
      required: false,
    },
    mrg_date: {
      required: false,
      number: false,
    },
    m_dob: {
      required: false,
      number: false,
    },
    man_dob: {
      required: false,
      number: false,
    },
    age: {
      required: false,
    },
    man_age: {
      required: false,
    },
    sslc_cert_no: {
      required: false,
    },
    dip_cert_no: {
      required: false,
    },
    degree_cert_no: {
      required: false,
    },
    annaul_income: {
      required: false,
    },
    cmnty: {
      required: false,
    },
    cmnty_cert_no: {
      required: false,
    },
    marriage_address: {
      required: false,
    },
    mar_reg_place: {
      required: false,
    },
    mar_reg_no: {
      required: false,
    },
    manamagan_nme: {
      required: false,
    },
    man_parent_nme: {
      required: false,
    },
    man_parent_address: {
      required: false,
    },
    man_address: {
      required: false,
    },
    ifs_code: {
      required: false,
    },
    bank_acno: {
      required: false,
    },
    bank_name: {
      required: false,
    },
    bank_branch: {
      required: false,
    },
    aathor_no: {
      required: false,
    },
    man_work: {
      required: false,
    },
    wid1_name: {
      required: false,
    },
    wid1_address1: {
      required: false,
    },
    wid1_pin: {
      required: false,
    },
    wid2_name: {
      required: false,
    },
    wid1_address2: {
      required: false,
    },
    wid2_pin: {
      required: false,
    },
    wed_card: {
      required: false,
    },
    file_community: {
      required: false,
    },
    file_ration_or_native: {
      required: false,
    },
    file_birth_or_tc: {
      required: false,
    },
    file_bank_passbook: {
      required: false,
    },
    file_sslc: {
      required: false,
    },
    file_hsc: {
      required: false,
    },
    file_degree: {
      required: false,
    },
    file_dip: {
      required: false,
    },
    file_applnt_photo: {
      required: false,
    },
    file_applnt_amma_photo: {
      required: false,
    },
    file_applnt_appa_photo: {
      required: false,
    },
    file_man_photo: {
      required: false,
    },
    file_applnt_sign: {
      required: false,
    },
    file_appln_par_sign: {
      required: false,
    },
    file_man_sign: {
      required: false,
    },
    file_wid1_sign: {
      required: false,
    },
    file_wid2_sign: {
      required: false,
    },
    file_wid1_proof: {
      required: false,
    },
    file_wid2_proof: {
      required: false,
    },
    file_income: {
      required: false,
    },
  },
  submitHandler: function (form) {
    var frm = $("#Muvaloor-application-form");

    if (Number(frm.age.value) < 18) {
      alert("Age Should be Complete 18");
      return false;
    }

    if (Number(frm.ass_const.value) <= 0) {
      alert("Please Select Your Assembly   ");
      return;
    }

    if (frm.mobile_no.value.length == 10) {
      if (Number(frm.mobile_no.value) < 1111111111) {
        alert("Please Enter the  Mobile Number  1");
        return false;
      }
    } else {
      alert("Please Enter the  Mobile Number 2 ");
      return false;
    }

    if (frm.manapen_amma.value.length <= 0) {
      alert("Please Enter Manapen Amma Name ");
      return false;
    }

    if (frm.manapen_appa.value.length <= 0) {
      alert("Please Enter Manapen Appa Name ");
      return false;
    }

    if (frm.mrg_date.value.length < 8) {
      alert("Please Enter Marriage Date ");
      return false;
    }

    if (frm.m_dob.value.length < 8) {
      alert("Please Enter Date of Birth ");
      return false;
    }

    if (frm.man_dob.value.length < 8) {
      alert("Please Enter Date of Birth ");
      return false;
    }

    if (Number(frm.man_age.value) <= 21) {
      alert("Manamagan Age Should be >21 ");
      return false;
    }

    if (Number(frm.man_age.value) <= 21) {
      alert("Manamagan Age Should be >21 ");
      return false;
    }

    if (frm.mrg_date.value.length < 9) {
      alert("Please Enter the Marriage Date ");
      return false;
    }

    if (frm.sslc_cert_no.value.length <= 0) {
      alert("Please Enter Sslc Certificate Number ");
      return false;
    }

    if (frm.marriage_address.value.length <= 10) {
      alert("Please Enter Marriage Place Address  ");
      return false;
    }

    if (frm.manamagan_nme.value.length <= 0) {
      alert("Please Enter Manamagan Name ");
      return false;
    }

    if (frm.man_parent_nme.value.length <= 0) {
      alert("Please Enter Manamagan Parent Name ");
      return false;
    }

    if (frm.man_parent_address.value.length <= 0) {
      alert("Please Enter Manamagan Parent Address ");
      return false;
    }

    if (frm.man_address.value.length <= 0) {
      alert("Please Enter Manamagan   Address ");
      return false;
    }

    if (frm.bank_acno.value.length <= 4) {
      alert("Please Enter Bank Account Number  ");
      return false;
    }

    if (frm.bank_name.value.length <= 4) {
      alert("Please Enter Bank   Name ");
      return false;
    }

    if (frm.bank_branch.value.length <= 4) {
      alert("Please Enter Bank Branch Name ");
      return false;
    }

    if (frm.wid1_name.value.length <= 0) {
      alert("Please Widness 1 Name  ");
      return false;
    }

    if (frm.wid1_address1.value.length <= 4) {
      alert("Please Widness 1 Address  ");
      return false;
    }

    if (frm.wid2_name.value.length <= 0) {
      alert("Please Widness 2 Name  ");
      return false;
    }

    var vv = "Annual" + Number(frm.annaul_income.value);
    if (vv == "AnnualNaN") {
      alert("Please Enter the Numeric Value");
      return false;
    }

    if (Number(frm.annaul_income.value) <= 0) {
      alert("Please Enter the Annual Income ");
      return false;
    }

    if (Number(frm.annaul_income.value) > 72000) {
      alert("Your are not elgible to get Benifit");
      return false;
    }

    if (Number(frm.cmnty.value) <= 0) {
      alert("Please Select Community ");
      return false;
    }

    if (frm.cmnty_cert_no.value.length <= 5) {
      alert("Please Enter Community Certificate Number");
      return false;
    }

    if (document.getElementById("marry_date").innerHTML.length > 30) {
      alert("Please Check the  Marriage Date");
      return false;
    }

    if (frm.ifs_code.value.length < 5) {
      alert("Please Enter IFSC code ");
      return false;
    }

    return true;
  },
});

$(".school-reg-form").validate({
  rules: {
    scl_name: {
      required: false,
    },
    scl_ADate: {
      required: false,
    },
    scl_gender: {
      required: false,
    },
    scl_date: {
      required: false,
    },
    scl_age: {
      required: false,
    },
    scl_Addr: {
      required: false,
    },
    scl_phone1: {
      required: false,
    },
    scl_phone2: {
      required: false,
    },
    scl_email: {
      required: false,
    },

    scl_edu: {
      required: false,
    },
    scl_job: {
      required: false,
    },
    scl_educaname: {
      required: false,
    },
    "scl_UPload  ": {
      required: false,
    },
  },

  submitHandler: function (form) {
    var scl_UPload = $("#scl_UPload").val();
    var scl_gender = $("#scl_gender").val();
    var scl_edu = $("#scl_edu").val();
    var scl_job = $("#scl_job").val();
    var scl_Addr = $("#scl_Addr").val();
    var scl_age = $("#scl_age").val();
    var old_school = $("#old-school").val();
    var old_address = $("#old-address").val();
    var old_year = $("#old-year").val();

    $("#scl_educaname").val(old_school + "," + old_address + "," + old_year);
    var scl_educaname = $("#scl_educaname").val();
    console.log("scl_educaname", scl_educaname);
    var year = $("#sel_year").val();
    var month = $("#sel_month").val();
    var day = $("#sel_day").val();
    var scl_email = $("#scl_email").val();
    var scl_edu = $("#scl_edu").val();
    // var scl_edu = $("#scl_edu").val();
    $("#scl_gender").val();
    $(".custom-error").html("");

    $("#scl_date").val(year + "-" + month + "-" + day);
    var scl_date = $("#scl_date").val();
    console.log("scl_date", scl_date);
    var regex = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/g;
    if (!regex.test(scl_date) && scl_date != "--") {
      $(".dob-select").append(
        '<label  class="custom-error error" >Invalid Date of Birth</label>'
      );
      return false;
    }

    var selectGender = $("#selectGender").val();

    if (selectGender == "") {
      $(".selectGender-list").append(
        '<label  class="custom-error error" >Choose selectGender</label>'
      );
      return false;
    }

    return true;
  },
});

$(document).ready(function () {
  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear() + "-" + month + "-" + day;

  $("#scl_ADate").val(today);

  $("#test").click(function () {
    testClicked();
  });
});
function testClicked() {
  console.log($("#datePicker").val());
}

function fn_divs(e) {
  console.log("thisthisthis", $(e).val());
  $("#cb_communityHallId").remove();
  $("#emptyChall").show();
  var divs = $(e).val();
  if (divs === "") {
    return false;
  }
  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/onlinebooking/communityhall_ajax.jsp?DIVS=" +
      divs,
    success: function (response) {
      console.log("response", response);
      $("#emptyChall").hide();
      $(".comHallList").append(response);
      $(".comHallList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
}

function fn_getareas(e) {
  var divs = $("#divs").val();
  var zoneid = $("#zone").val();
  $("#area").remove();
  $(".empty_area-line-select").hide();

  if (divs === "") {
    return false;
  }
  if (zoneid === "") {
    return false;
  }
  $.ajax({
    type: "get",
    url:
      "https://chennaicorporation.gov.in/moovaloor/mis_area_ajax.jsp?ZONEID=" +
      zoneid +
      "&DIVID=" +
      divs,
    success: function (response) {
      console.log("response", response);

      $(".areaList").append(response);
      $(".areaList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
}

function fn_getlocs(area) {
  var divs = $("#divs").val();

  var zoneid = $("#zone").val();
  $("#loc").remove();

  $("#Location-select").show();
  var AREA = $("#area").val();

  if (divs === "") {
    return false;
  }
  if (zoneid === "") {
    return false;
  }
  var url =
    "https://chennaicorporation.gov.in/moovaloor/mis_loc_ajax.jsp?ZONEID=" +
    zoneid +
    "&DIVID=" +
    divs +
    "&AREA=" +
    AREA;
  $.ajax({
    type: "get",
    url: url,
    success: function (response) {
      console.log("response", response);
      $("#Location-select").hide();
      $(".locationList").append(response);
      $(".locationList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
}

function fn_getstreets(area) {
  var divs = $("#divs").val();

  var zoneid = $("#zone").val();
  $("#Street-select").show();
  var AREA = $("#area").val();
  var LOC = $("#loc").val();
  if (divs === "") {
    return false;
  }
  if (zoneid === "") {
    return false;
  }
  $("#sel_street").remove();
  var url =
    "https://chennaicorporation.gov.in/moovaloor/mis_street_ajax.jsp?ZONEID=" +
    zoneid +
    "&DIVID=" +
    divs +
    "&AREA=" +
    AREA +
    "&LOC=" +
    LOC;
  $.ajax({
    type: "get",
    url: url,
    success: function (response) {
      console.log("response", response);
      $("#Street-select").hide();
      $(".streetList").append(response);
      $(".streetList")
        .find("select")
        .addClass("form-control form-control choose-field");
    },
  });
}