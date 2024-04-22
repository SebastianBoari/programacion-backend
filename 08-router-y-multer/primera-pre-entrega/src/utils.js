// Imports
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Path
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Format Date
/**
 * @returns {string} returns current date YYYY-MM-DD 
 */
function getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
  
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    
    return `${year}-${month}-${day}`
}

/** 
 * Returns a trimmed, space-free, and shortened version of the original string
 * @param {string} title - The original string to be processed
 * @returns {string} - The processed string.
 */
function formatTitle (title) {
    
    let formattedTitle = title.trim()
    
    formattedTitle = formattedTitle.toLowerCase().replace(/\s+/g, '-')

    if (formattedTitle.length > 50) {
        formattedTitle = formattedTitle.substring(0, 50)

        if (formattedTitle.charAt(formattedTitle.length - 1) === '-') {
            formattedTitle = formattedTitle.substring(0, formattedTitle.length - 1)
        }
    }

    return formattedTitle
}

// Exports
export { __dirname, getCurrentDate, formatTitle }