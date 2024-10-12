"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log("Ativando a extensão Jaccon");
    // Cria um item na Status Bar com o texto 'jcgpt'
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(rocket) jcgpt`;
    statusBarItem.command = 'jaccon.openWebview';
    statusBarItem.tooltip = 'Clique para abrir o Jaccon Webview';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    // Registra o comando para abrir o Webview
    let disposable = vscode.commands.registerCommand('jaccon.openWebview', () => {
        console.log("Comando 'jaccon.openWebview' foi executado.");
        // Criação do painel de Webview
        const panel = vscode.window.createWebviewPanel('jacconWebview', // Identificador do Webview
        'Jaccon ChatGPT Extension', // Título do painel
        vscode.ViewColumn.Active, // Posição do painel
        {
            enableScripts: true,
            retainContextWhenHidden: true, // Preserva o estado do Webview quando oculto
        });
        // Define o conteúdo do Webview
        panel.webview.html = getWebviewContent();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Jaccon</title>
            <style>
                body, html {
                    height: 100%; /* 100% da altura do Webview */
                    margin: 0; /* Remove margem */
                    padding: 0; /* Remove preenchimento */
                    overflow: hidden; /* Oculta barras de rolagem */
                }
                iframe {
                    width: 100%; /* 100% da largura do Webview */
                    height: 100%; /* 100% da altura do Webview */
                    border: none; /* Remove bordas do iframe */
                }
            </style>
        </head>
        <body>
            <iframe src="https://www.jaccon.com.br"></iframe>
        </body>
        </html>
    `;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map