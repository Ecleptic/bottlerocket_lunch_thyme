const slugify = text => {
    const specialChars = 'àáäãâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const normalChars = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const splitAccents = new RegExp(specialChars.split('').join('|'), 'g')

    return text
        .toString()
        .toLowerCase()
        .replace(splitAccents, a => normalChars.charAt(specialChars.indexOf(a)))
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '') // eslint-disable-line no-useless-escape
}

export default slugify
