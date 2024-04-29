from flask import Flask, request, render_template, redirect, url_for, jsonify
import mysql.connector

bot = Flask(__name__)

db_config = mysql.connector.connect(
    host='localhost',
    user='Ryuk',
    password='pandapag',
    database='aula_13_10'
)

cursor = db_config.cursor()

@bot.route('/')
def index():
    cursor.execute('SELECT * FROM funcionarios')
    funcionarios = cursor.fetchall()
    return render_template('index.html', funcionarios=funcionarios)

@bot.route('/funcionario', methods=['POST'])
def funcionario():
    id = request.form.get('id')
    primeiro_nome = request.form['primeiro_nome']
    sobrenome = request.form['sobrenome']
    data_admissao = request.form['data_admissao']
    status_funcionario = request.form['status_funcionario']
    if id:
        cursor.execute('UPDATE funcionarios SET primeiro_nome=%s, sobrenome=%s, data_admissao=%s, status_funcionario=%s WHERE id=%s',
                       (primeiro_nome, sobrenome, data_admissao, status_funcionario, id))
    else:
        cursor.execute('INSERT INTO funcionarios (primeiro_nome, sobrenome, data_admissao, status_funcionario) VALUES (%s, %s, %s, %s)',
                       (primeiro_nome, sobrenome, data_admissao, status_funcionario))
    db_config.commit()
    return redirect(url_for('index'))

@bot.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    try:
        cursor.execute('DELETE FROM funcionarios WHERE id = %s', (id,))
        db_config.commit()
        return redirect(url_for('index'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bot.route('/update', methods=['POST'])
def update():
    try:
        id = request.form['id']
        primeiro_nome = request.form['primeiro_nome']
        sobrenome = request.form['sobrenome']
        data_admissao = request.form['data_admissao']
        status_funcionario = request.form['status_funcionario']
        cursor.execute('UPDATE funcionarios SET primeiro_nome=%s, sobrenome=%s, data_admissao=%s, status_funcionario=%s WHERE id=%s',
                       (primeiro_nome, sobrenome, data_admissao, status_funcionario, id))
        db_config.commit()
        return redirect(url_for('index'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    bot.run()