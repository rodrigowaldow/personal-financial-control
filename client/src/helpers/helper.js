const formatDate = (date) => {
  date = new Date(date);

  const options = {
    month: 'short',
    year: 'numeric',
  };

  const dt = new Intl.DateTimeFormat('default', options)
    .format(date)
    .replace('. de ', '/');

  return dt;
};

const toBRL = (num) => {
  return num.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
    maximumFractoryDigits: 2,
  });
};

export { formatDate, toBRL };
