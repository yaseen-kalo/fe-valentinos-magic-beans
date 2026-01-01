import 'dotenv/config';

const DOMAIN = process.env.MAILOSAUR_DOMAIN || 'test.mailosaur.net';

export const checkoutInfo = [
  {
    address: {
      firstName: "Valentino",
      lastName: "Bean",
      email: `sarah.shotts@${DOMAIN}`,
      address: "123 Magic Bean Lane",
      city: "Beanville",
      postalCode: "12345",
      country: "United States"
    },
    creditCard: {
      cardHolderName: "Valentino Bean",
      cardNumber: "4577 7614 2053 1255",
      expiryDate: "12/28",
      cvv: "123"
    }
  }
];

export const checkoutInfoFore2e = [
  {
    address: {
      address: "123 Magic Bean Lane",
      city: "Beanville",
      postalCode: "12345",
      country: "United States"
    },
    creditCard: {
      cardHolderName: "Valentino Bean",
      cardNumber: "4577 7614 2053 1255",
      expiryDate: "12/28",
      cvv: "123"
    }
  }
];