import {ref} from 'vue'

export const store = {
    selectedDate: ref(new Date()),
    habitBank: ref(JSON.parse(localStorage.getItem('habits')) || []),
    today: new Date().toLocaleDateString('en-CA')
}