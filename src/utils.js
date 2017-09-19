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

export const transactions = [
  {
    transId: 1,
    transAmt: 2,
    transTo: 'BankB'
  },
  {
    transId: 2,
    transAmt: 2,
    transTo: 'BankA'
  },
  {
    transId: 3,
    transAmt: 11,
    transTo: 'BankC'
  },
  {
    transId: 4,
    transAmt: 2,
    transTo: 'BankD'
  },
  {
    transId: 5,
    transAmt: 2,
    transTo: 'BankE'
  },
  {
    transId: 6,
    transAmt: -1,
    transTo: 'BankF'
  },
  {
    transId: 7,
    transAmt: 2,
    transTo: 'BankG'
  },
  {
    transId: 8,
    transAmt: 2,
    transTo: 'BankH'
  },
  {
    transId: 9,
    transAmt: 2,
    transTo: 'BankI'
  },
  {
    transId: 10,
    transAmt: 2,
    transTo: 'BankJ'
  },
  {
    transId: 11,
    transAmt: 2,
    transTo: 'BankK'
  }
]
