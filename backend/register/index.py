'''
Business: Регистрация игрока с генерацией ника и пароля, сохранение в БД
Args: event - dict с httpMethod, body (email)
      context - объект с request_id, function_name
Returns: HTTP response dict с игровым ником и паролем
'''

import json
import random
import string
from typing import Dict, Any
from datetime import datetime

def generate_username() -> str:
    return f"Player{random.randint(1000, 9999)}"

def generate_password(length: int = 8) -> str:
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    if not body_str or body_str == '':
        body_str = '{}'
    
    body_data = json.loads(body_str)
    email = body_data.get('email', '')
    
    if not email:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email is required'}),
            'isBase64Encoded': False
        }
    
    username = generate_username()
    password = generate_password()
    created_at = datetime.utcnow().isoformat()
    
    result = {
        'username': username,
        'password': password,
        'email': email,
        'created_at': created_at,
        'message': f'Credentials sent to {email}'
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(result),
        'isBase64Encoded': False
    }