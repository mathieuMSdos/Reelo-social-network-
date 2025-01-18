

  const dateFormatter = new Intl.DateTimeFormat("en-US",{
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  })

  export const dateFormat = (dateToFormat) => dateFormatter.format(dateToFormat)