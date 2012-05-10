<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" AutoEventWireup="true" CodeBehind="Profile.aspx.cs" Inherits="AplicatieLicenta.Views.Profile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div id="myprofile" style= "display:none">
  <asp:Image ID="img_user" runat="server" Visible="true" Height="114px" Width="145px" />
        <br />
        <hr />
        <h2>Change YOUR ACCOUNT INFORMATION </h2>
        <p> Use the form below to change your informations or your password.</p>
        <asp:FileUpload ID="FileUpload1" runat="server" />
        <asp:Button ID="Btn_Upload" runat="server" Text="Upload" OnClick="Btn_Upload_Click" />
        <div class="accountInfo">
            <fieldset class="changeName">
                <legend>Change some Informations</legend>
                <asp:Label ID="Lbl_Name" runat="server" Text="Name"></asp:Label>
                <asp:TextBox ID="Txt_Name" CssClass="passwordEntry" runat="server" ValidationGroup="ChangeInformations"></asp:TextBox><br />
                <asp:Label ID="Lbl_NickName" runat="server" Text="Nick Name"></asp:Label>
                <asp:TextBox ID="Txt_NickName" CssClass="passwordEntry" runat="server" ValidationGroup="ChangeInformations"></asp:TextBox><br />
                <asp:Label ID="Lbl_DateOfBirth" runat="server" Text="Date Of Birth"></asp:Label>
                <asp:TextBox ID="Txt_DateOfBirth" CssClass="passwordEntry" runat="server" ValidationGroup="ChangeInformations"></asp:TextBox><br />
                <asp:Label ID="Lbl_Email" runat="server" Text="Email"></asp:Label>
                <asp:TextBox ID="Txt_Email" CssClass="passwordEntry" runat="server" ValidationGroup="ChangeInformations"></asp:TextBox><br />
           </fieldset>
            <p>
                <asp:Button ID="UpdateBtn" runat="server" CssClass="submitButton" Text="Update informations"
                    OnClick="UpdateBtn_Click" ValidationGroup="ChangeInformations" />
            </p>
            <fieldset class="changePassword">
                <legend>Change your Password</legend>
                <p>
                    <asp:Label ID="CurrentPasswordLabel" runat="server" AssociatedControlID="Txt_CurrentPassword">Old Password:</asp:Label>
                    <asp:TextBox ID="Txt_CurrentPassword" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="CurrentPasswordRequired" runat="server" ControlToValidate="Txt_CurrentPassword"
                        ValidationGroup="ChangeUserAccount">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="NewPasswordLabel" runat="server" AssociatedControlID="Txt_NewPassword">New Password:</asp:Label>
                    <asp:TextBox ID="Txt_NewPassword" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="NewPasswordRequired" runat="server" ControlToValidate="Txt_NewPassword"
                        ErrorMessage="New Password is required." ToolTip="New Password is required."
                        ValidationGroup="ChangeUserAccount">*</asp:RequiredFieldValidator>
                </p>
                <p>
                    <asp:Label ID="ConfirmNewPasswordLabel" runat="server" AssociatedControlID="ConfirmNewPassword">Confirm New Password:</asp:Label>
                    <asp:TextBox ID="ConfirmNewPassword" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="ConfirmNewPasswordRequired" runat="server" ControlToValidate="ConfirmNewPassword"
                        ValidationGroup="ChangeUserAccount">*</asp:RequiredFieldValidator>
                    <asp:CompareValidator ID="NewPasswordCompare" runat="server" ControlToCompare="Txt_NewPassword"
                        ControlToValidate="ConfirmNewPassword" ErrorMessage="The Confirm New Password must match the New Password entry."
                        ValidationGroup="ChangeUserAccount">*</asp:CompareValidator>
                </p>
            </fieldset>
            <p>
                <asp:Label ID="Lbl_Succes" runat="server" color="red"></asp:Label>
                <asp:Button ID="CancelBtn" runat="server" CausesValidation="False" OnClick="CancelBtn_Click"
                    CssClass="submitButton" Text="<--Back" Width="88px" />
                <asp:Button ID="UpdatePasswordBtn" runat="server" CssClass="submitButton" OnClick="UpdatePasswordBtn_Click"
                    Text="Update Password" ValidationGroup="ChangeUserAccount" />
            </p>
        </div>
   </div>
   <div id="UserProfile"  style="display:block">
   <asp:Label ID="Lbl_SuccesUser" runat="server"></asp:Label><br />
   <asp:Panel ID="Panel_Moderator" runat="server" Visible="false">
   <fieldset><legend>User Picture</legend>
   <asp:Image ID="Img_UserImageModerator" runat="server" /></fieldset><br /><br />
  <%-- <asp:FileUpload ID="FileUpload2" runat="server" />
   <asp:Button ID="Btn_UploadPictureModerator" Text="Upload Picture" OnClick="Btn_UploadPictureModerator_Click" runat="server"/>--%>
    First Name: <asp:TextBox ID="Txt_FNModerator" runat="server"></asp:TextBox><br />   
    Last Name: <asp:TextBox ID="Txt_LNModerator" runat="server"></asp:TextBox><br />
    Date Of Birth: <asp:TextBox ID="Txt_DateOfBirthModerator" runat="server"></asp:TextBox><br />
    Email: <asp:TextBox ID="Txt_EmailModerator" runat= "server"></asp:TextBox><br />
   Is Moderator  <asp:CheckBox ID="chk_ismodmoderator" runat="server" /><br />
   Is Deleted  <asp:CheckBox ID="chk_isdeleted" runat="server" /><br />
   Password <asp:TextBox ID="txt_newpassmoderator" runat="server"></asp:TextBox><br />
   <asp:Button ID="button_updateaccountmoderator" runat="server" Text="Update changes" />

   </asp:Panel>
   </div>
    <asp:Panel runat="server" ID="Panel_Nonmoderator" Visible="false">
        <fieldset><legend>User picture</legend>
        <asp:Image ID="img_userimage" runat="server" /></fieldset><br />
        <fieldset><legend>User info</legend>
        <div class="userinfo">
            First name: <asp:Label ID="Lbl_userfname" runat="server"></asp:Label><br />
            Last name: <asp:Label ID="Lbl_userlname" runat="server"></asp:Label><br />
            Date of birth: <asp:Label ID="Lbl_userdate" runat="server"></asp:Label><br />
            E-mail: <asp:Label ID="Lbl_useremail" runat="server"></asp:Label><br />
            </div></fieldset>
           
    </asp:Panel>
</asp:Content>
