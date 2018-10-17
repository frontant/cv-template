var dateformat = require("dateformat");

var date = dateformat(new Date(), 'dd.mm.yyyy');

module.exports = {
    header: {
        github:{
            caption: 'CV-Template',
            link: 'https://github.com/frontant/cv-template'
        },
        date: 'City, ' + date
    },
    contact: {
        title: 'Contact',
        item1: {
            caption: 'Mobile',
            data: '+123 45 67 89 00'
        },
        item2: {
            caption: 'E-Mail',
            data: '<a href="mailto:bernard.keen@example.com?subject=Request">bernard.keen@example.com</a>'
        },
        item3: {
            caption: 'Websites',
            data: `<a href="https://github.com" target="_blank">https://github.com</a>`
        },
        item4: {
            caption: 'Address',
            data: `Example Street<br>12345 City`
        }
    },
    skills: {
        title: 'Skills',
        item1:{
            subject: 'Html',
            mark: 'skills__item-bar--very-good'
        },
        item2:{
            subject: 'Css',
            mark: 'skills__item-bar--good'
        },
        item3:{
            subject: 'Photoshop',
            mark: 'skills__item-bar--average'
        },
        item4:{
            subject: 'Javascript',
            mark: 'skills__item-bar--very-good'
        },
        item5:{
            subject: 'Php',
            mark: 'skills__item-bar--average'
        },
        item6:{
            subject: 'Git',
            mark: 'skills__item-bar--good'
        }
    },
    lang: {
        title: 'Languages',
        data: {
            lang1: {
                caption: 'English',
                level: 'Mother tongue'
            },
            lang2: {
                caption: 'German',
                level: 'Full professional proficiency'
            },
            lang3: {
                caption: 'Spanish',
                level: 'Basic knowledge'
            }
        }
    },
    aboutMe: {
        firstName: 'Bernard',
        lastName: 'Keen',
        position: 'Web Developer',
        summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Id non, fugit saepe reiciendis cumque sit magnam officiis veniam
        iusto <span class='generic-content-container__highlight'>voluptatum</span>
        aut dolores <span class='generic-content-container__highlight'>perspiciatis</span>
        autem <span class='generic-content-container__highlight'>sapiente</span>
        totam, reprehenderit, vero sunt culpa!`
    },
    experience:{
        title : 'Experience',
        item1: {
            period: {
                start: 2017,
                end: 2018,
            },
            location: 'Sydney, AU',
            firm: 'Ino-Tech Ficional ',
            position: 'Junior Web Front End Developer',
            summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Id non, fugit saepe reiciendis cumque sit magnam officiis veniam.`
        },
        item2: {
            period: {
                start: 2016,
                end: 2017,
            },
            location: 'San José, US',
            firm: 'Ficional Teco',
            position: 'Junor UX Developer',
            summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quam, incidunt perspiciatis, esse eos asperiores repudiandae porro
            nulla fugit quidem amet tenetur neque beatae?`
        },
        item3: {
            period: {
                start: 2016,
                end: 2013,
            },
            location: 'Berlin, DE',
            firm: 'Audi AG',
            position: 'Student Employee',
            summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit
            Quam, incidunt perspiciatis, esse eos asperiores repudiandae porro
            nulla fugit quidem amet.`
        }
    },
    education: {
        title: 'Education',
        item1: {
            period: {
                start: 2011,
                end: 2013,
            },
            location: 'Munich, DE',
            school: 'Munich University of Applied Sciences',
            degree: 'M.B.A. WebDevelopment',
            summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quam, incidunt perspiciatis, esse eos asperiores repudiandae
            porro nulla fugit quidem.`
        },
        item2: {
            period: {
                start: 2005,
                end: 2011,
            },
            location: 'Munich, DE',
            school: 'Advancement of Science And Art',
            degree: 'B.Sc. Creative Arts',
            summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quam, incidunt perspiciatis, esse eos asperiores repudiandae.`
        }
    },
    interests: {
        title: 'Interests',
        item1: {
            icon: 'icon--terminal',
            caption: 'Coding'
        },
        item2: {
            icon: 'icon--game-controller',
            caption: 'Games'
        },
        item3: {
            icon: 'icon--compass',
            caption: 'Hiking'
        },
        item4: {
            icon: 'icon--saddle',
            caption: 'Cycling'
        }
    }
};