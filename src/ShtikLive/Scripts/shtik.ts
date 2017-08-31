﻿/// <reference path="./notes.ts" />
/// <reference path="./questions.ts" />
/// <reference path="./nav.ts" />

namespace Shtik.AutoNav {
    import NotesForm = Notes.NotesForm;
    import QuestionsForm = Questions.QuestionsForm;
    import NavButtons = Nav.NavButtons;

// ReSharper disable InconsistentNaming
    interface IMessage {
        MessageType: string;
        Slide?: number;
    }
// ReSharper restore InconsistentNaming


    var notesForm: NotesForm;
    var questionsForm: QuestionsForm;
    var nav: NavButtons;

    document.addEventListener("DOMContentLoaded", () => {

        notesForm = new NotesForm();
        notesForm.load();

        questionsForm = new QuestionsForm();
        questionsForm.load();

        nav = new NavButtons();

        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const path = window.location.pathname.substr(5).replace(/\/[0-9]+$/, "");
        const wsUri = `${protocol}//${window.location.host}${path}`;
        const socket = new WebSocket(wsUri);

        socket.addEventListener("message", e => {
            const data = JSON.parse(e.data) as IMessage;
            if (data.MessageType === "slideshown") {
                if (notesForm.dirty || questionsForm.dirty) return;
                nav.go(window.location.pathname.replace(/\/[0-9]+$/, `/${data.Slide}`));
            }
        });

        socket.addEventListener("message", questionsForm.onMessage);


    });

    console.log("Wibble");
}