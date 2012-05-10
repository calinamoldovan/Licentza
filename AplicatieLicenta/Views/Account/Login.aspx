<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript">
    $(document).ready(function () {

    });
</script>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"> </script>
<script type="text/javascript" src="http://connect.facebook.net/en_US/all.js"></script>

<script type="text/javascript" language="javascript">


    $(document).ready(function () {

        $("#login").show();
        $("#register").hide();
        $("#recoverpassword").hide();

        $(".lnkLogin").click(function () {
            showLoginItems();
        });

        $(".lnkRegister").click(function () {
            showRegisterItems();
        });

        $(".lnkForgotPassword").click(function () {
            showForgotPasswordItems();
        });
    });

    function showLoginItems() {
        $("#login").show();
        $("#register").hide();
        $("#recoverpassword").hide();
    }

    function showRegisterItems() {
        $("#login").hide();
        $("#register").show();
        $("#recoverpassword").hide();
    }

    function showForgotPasswordItems() {
        $("#login").hide();
        $("#register").hide();
        $("#recoverpassword").show();
    }
    </script>

</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div id="login" >
<h1>Log In</h1><br />
    <fieldset id="inputs">
        <input type="email" required="" autofocus="" placeholder="Email" id="txtEmail" name="userEmail"/>   
        <input type="password" required="" placeholder="Password" id="password" name="userPass"/>
    </fieldset>
    <fieldset class="actions">
        <input type="submit" value="Login" id="submit"/>
       <a href="#" class="lnkRegister">Register</a> 
       <a href="#" class="lnkForgotPassword">Forgot your password?</a>
    </fieldset>

</div>
<div id="register" >
<h1>REGISTER</h1><br /><br />
    <fieldset id="Fieldset1">
       Name: <input type="text" required="" autofocus="" placeholder="First Name" name="userFirstName" style="margin-left:45px"/> <br /><br />  
       Nick Name:<input type="text" required="" autofocus="" placeholder="Nick Name" name="userNickName" style="margin-left:50px"/> <br /><br />
       City: <input type="text" required="" autofocus="" placeholder="City" name="userCity"style="margin-left:85px"/> <br /><br />
       E-mail address:<input type="email" required="" autofocus="" placeholder="Email"name="userEmail" style="margin-left:25px"/><br />  <br /> 
       Password:<input type="password" required="" placeholder="Password" name="userPass" style="margin-left:55px"/><br /><br />
       Confirm Password<input type="password" required="" placeholder="Password" name="userPass" style="margin-left:12px"/><br /><br /><br />
       
    </fieldset>
    <fieldset class="actions">
        <input type="submit" value="Register" id="submit2"/>
        <a href="#" class="lnkLogin">Login</a> 
        <a href="#" class="lnkForgotPassword">Forgot your password?</a>

    </fieldset>

</div>

<div id="recoverpassword"  >
<h2>Forgot password</h2><br />
<h5>Please enter the e-mail address for your account. A verification token will be sent to you. Once you have received the token, you will be able to choose a new password for your account.</h5><br /><br />
    <fieldset id="Fieldset3">
      E-mail address:<input type="email" required="" autofocus="" placeholder="Email"name="userEmail" style="margin-left:12px"/><br /><br />   
    </fieldset>
    <fieldset class="actions">
        <input type="submit" value="ForgotPassword" id="submit3"/>
        <a href="#" class="lnkLogin">Login</a> 
        <a href="#" class="lnkRegister">Register</a>
    </fieldset>
</div>
</asp:Content>


