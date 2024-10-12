import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log("Ativando a extensão Jaccon");

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(link) jcgpt`;
    statusBarItem.command = 'jaccon.openWebview';
    statusBarItem.tooltip = 'Clique para abrir o Jaccon Webview';
    statusBarItem.show();

    context.subscriptions.push(statusBarItem);

    let disposable = vscode.commands.registerCommand('jaccon.openWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'jcgpt',
            'jcGPT',
            vscode.ViewColumn.Active, // Mantenha na coluna ativa
            {
                enableScripts: true,
                retainContextWhenHidden: true,
            }
        );

        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(disposable);
}

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
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <iframe src="https://www.jaccon.com.br"></iframe>
        </body>
        </html>
    `;
}

export function deactivate() {}
