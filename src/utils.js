export const calculateBalance = transactions => transactions.reduce((total, transaction) => total + transaction.transAmt, 0)

export const convertLabel = label => {
    switch (label) {
      case 'Date':
        return 'transTime';
      case 'Amount':
        return 'transAmt';
      case 'Description':
        return 'description';
      case 'To':
        return 'transTo';
      case 'From':
        return 'transFrom';
    }
  }

export const convertDate = timeStamp => new Date(timeStamp).toDateString().slice(4);

export const convertAmount = amount => {
  let formattedAmt = amount.toLocaleString();
  formattedAmt = amount < 0 ? `-$${formattedAmt.slice(1)}` : `$${formattedAmt}`;
  if (!formattedAmt.includes('.')) formattedAmt += '.00';
  if (formattedAmt[formattedAmt.length - 2] === '.') formattedAmt += '0';
  return formattedAmt;
  }

export const oneDay = 24 * 60 * 60 * 1000;

export const transactions = [
  {
    transId: 1,
    transAmt: 2,
    transTo: 'BankB',
    transTime: new Date() - oneDay * 91
  },
  {
    transId: 2,
    transAmt: 2,
    transTo: 'BankA',
    transTime: new Date() - oneDay * 31
  },
  {
    transId: 3,
    transAmt: 11,
    transTo: 'BankC',
    transTime: new Date() - oneDay * 8
  },
  {
    transId: 4,
    transAmt: 2,
    transTo: 'BankD',
    transTime: new Date()
  },
  {
    transId: 5,
    transAmt: 2,
    transTo: 'BankE',
    transTime: new Date()
  },
  {
    transId: 6,
    transAmt: -1,
    transTo: 'BankF',
    transTime: new Date()
  },
  {
    transId: 7,
    transAmt: 2,
    transTo: 'BankG',
    transTime: new Date()
  },
  {
    transId: 8,
    transAmt: 2,
    transTo: 'BankH',
    transTime: new Date()
  },
  {
    transId: 9,
    transAmt: 2,
    transTo: 'BankI',
    transTime: new Date()
  },
  {
    transId: 10,
    transAmt: 2,
    transTo: 'BankJ',
    transTime: new Date()
  },
  {
    transId: 11,
    transAmt: 2,
    transTo: 'BankK',
    transTime: new Date() - oneDay * 2
  }
]
