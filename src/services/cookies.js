const { cookies } = require("next/headers");

export class AppCookie {

    // set current date after some days
    static getDate(days) {
        const currentDate = new Date();
        const newDate = currentDate.setDate(currentDate.getDate() + days)
        return newDate;
    }

    static async getCookie(key) {
        const cookieObj = await cookieStore.get(key)
        return cookieObj.value;
     }
    static async getCookieAll() {
        const cookieObjArr = await cookieStore.getAll()
        return cookieObjArr;
     }
      
    static async setCookie(name, value, days) { // here 'name'in setting cookie we use cookieStore.set({ name: "loc", value: "mumbai"}) not 'key' 'value' it is 'name' and 'value'
        const cookieObj = { name, value }
        if (days) {
            cookieObj.expires = AppCookie.getDate(days)
        }
        // await cookieStore.set(key, value)
        await cookieStore.set(cookieObj)
    }

    // static updateCookie() { } // we dont need with setCookie the same updatecookie will do the work
   
    static async deleteCookie(key){ // it also expecting name and value
        await cookieStore.delete(key)
    }

    static async isLoggedIn(key){
        const cookieObj = await cookieStore.get("token")
        return cookieObj?.value ? true : false
    }
}