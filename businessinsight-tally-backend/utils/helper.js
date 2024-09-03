import moment from 'moment';

export const otpGenerate = async () =>
  Math.floor(100000 + Math.random() * 900000);

export const userRoles = {
  organizationAdmin: 'organizationAdmin',
  companyAdmin: 'companyAdmin',
  companyEmployee: 'companyEmployee',
  organizationEmployee: 'organizationEmployee',
  superAdmin: 'superAdmin',
};

export const logTypes = {
  Invite: 'InviteMail',
  Approve: 'Approve',
  Update: 'Update',
  Delete: 'Delete',
};

export const availableExtensions = ['.jpg', '.jpeg', '.png'];

export function getDaysAgo(day) {
  return moment().subtract(day, 'days').format('YYYY-MM-DD HH:mm:ss');
}

export function getCurrentDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
