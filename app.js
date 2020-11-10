var anzahlFehlversuche = 0;
        var gameFinished = false;
        var gerateneBuchstaben = [];
        var svg = Snap("#hangman");

        // wähle ein Wort aus und zeige es mit * an
        var wort = window.prompt("Welches Wort soll erraten werden?").toLowerCase();
        wortAnzeigen();
		// window.focus() ist in manchen Browsern notwendig, damit später document.onkeyup reagiert
        window.focus();

        // reagiere, wenn ein Buchstabe gedrückt wird
        document.onkeyup = function(event) {
            if (!gameFinished) {
                buchstabePruefen(event.key);
            }
        };

        // prüfe, ob ein Buchstabe bereits geraten wurde oder gar nicht im Wort vorkommt
        function buchstabePruefen(key) {
            if (gerateneBuchstaben.indexOf(key) >= 0) {
                // der Buchstabe wurde bereits gedrückt
                document.getElementById("info").innerText = "Du hast den Buchstaben " + key + " bereits geraten.";
                anzahlFehlversuche++;
                hangmanMalen();
            } else if (wort.indexOf(key) < 0) {
                // der Buchstabe kommt nicht im Wort vor
                document.getElementById("info").innerText = "Der Buchstabe " + key + " kommt im Wort nicht vor.";
                gerateneBuchstaben.push(key);
                anzahlFehlversuche++;
                hangmanMalen();
            } else {
                // es wurde ein Buchstabe erraten
                document.getElementById("info").innerText = "Super, du hast einen Buchstaben erraten";
                gerateneBuchstaben.push(key);
                wortAnzeigen();
            }

            // nach 10 Fehlversuchen ist das Spiel zu Ende
            if (anzahlFehlversuche >= 10) {
                document.getElementById("info").innerText = "Game over!";
                gameFinished = true;
            }
        }

        // zeige das Wort mit * für noch nicht erratene Buchstaben an
        function wortAnzeigen() {
            var verdecktesWort = wort;

            // prüfe für jeden Buchstaben im Wort, ob er sich bereits in den geratenen Buchstaben befindet
            for (var i = 0; i < verdecktesWort.length; i++) {
                if (gerateneBuchstaben.indexOf(verdecktesWort[i]) < 0) {
                    verdecktesWort = verdecktesWort.replace(verdecktesWort[i], "*");
                }
            }

            // zeige das verdeckte Wort an
            document.getElementById("wort").innerText = verdecktesWort;

            // wenn kein * im verdeckten Wort mehr vorkommt, dann wurde das ganze Wort erraten
            if (verdecktesWort.indexOf("*") < 0) {
                document.getElementById("info").innerText = "Gratuliere, du hast das Wort erraten!";
                gameFinished = true;
            }
        }

        // male das Galgenmännchen
        function hangmanMalen() {
            switch (anzahlFehlversuche) {
                case 1:
                    svg.line(50, 450, 150, 450);
                    break;
                case 2:
                    svg.line(100, 450, 100, 100);
                    break;
                case 3:
                    svg.line(100, 100, 300, 100);
                    break;
                case 4:
                    svg.line(300, 100, 300, 150);
                    break;
                case 5:
                    svg.circle(300, 170, 20);
                    break;
                case 6:
                    svg.line(300, 190, 300, 300);
                    break;
                case 7:
                    svg.line(300, 210, 250, 250);
                    break;
                case 8:
                    svg.line(300, 210, 350, 250);
                    break;
                case 9:
                    svg.line(300, 300, 250, 350);
                    break;
                case 10:
                    svg.line(300, 300, 350, 350);
                    break;
            }
        }

		// Hilfslinien malen
        //for (var x = 50; x < 400; x += 50) {
        //	svg.line(x, 0, x, 500).addClass("helperLine");
        //}

        //for (var y = 50; y < 500; y += 50) {
        //	svg.line(0, y, 400, y).addClass("helperLine");
        //}
