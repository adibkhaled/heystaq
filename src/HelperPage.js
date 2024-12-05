// RegistrationPage.js
import { expect } from '@playwright/test';

export class HelperPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async navigateToLogin() {
    await this.page.getByRole('link', { name: 'Log in' }).click();
  }

  async fillRegistrationForm(user) {
    await this.page.getByLabel('Male', { exact: true }).check();
    await this.page.getByLabel('First name:').fill(user.firstname);
    await this.page.getByLabel('Last name:').fill(user.lastname);
    await this.page.getByLabel('Email:').fill(user.email);
    await this.page.getByLabel('Password:', { exact: true }).fill(user.password);
    await this.page.getByLabel('Confirm password:').fill(user.password);
  }

  async fillLogin(user) {
    await this.page.getByLabel('Email:').fill(user.email);
    await this.page.getByLabel('Password:').fill(user.password);
  }

  async submitLogin() {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async submitRegistration() {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async continueAfterRegistration() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async verifyUserLoggedIn(email) {
    await expect(this.page.getByRole('link', { name: email })).toBeVisible();
  }

  async logOut() {
    await this.page.getByRole('link', { name: 'Log out' }).click();
  }

  async saveButton(){
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async clickEmailLink(email){
    await this.page.getByRole('link', { name: email }).click();
  }

  async fillUpdateEmail(email) {
    await this.page.getByLabel('Email:').fill(email);
  }


  async alreadyRegister(){
    try {
      const errorMessage = this.page.getByText('The specified email already'); 
      if (await errorMessage.isVisible()) {
        console.log('Email already specified:', await errorMessage.textContent());
        return 'Yes'; 
      }
    } catch (error) {
      console.log('No exception occurred or element not found:', error.message);
    }
    return 'No'

  }

  async verifyInvalidLogin(){
    try {
      const errorMessage = this.page.getByText('Login was unsuccessful.'); 
      if (await errorMessage.isVisible()) {
        console.log('Login unsuccessful', await errorMessage.textContent());
      }
    } catch (error) {
      return error.message;
    }
  }
}