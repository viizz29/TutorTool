const data = [
    {
        'id':1,
        'uid': 43,
        'name': 'Tanisha Paul',
        'amount': 500,
        'last_payment': '2023-08-02',
    },
    {
        'id':2,
        'uid': 38,
        'name': 'Gautam Kumar',
        'amount': 1000,
        'last_payment': '2023-08-02',
    },
    {
        'id':3,
        'uid': 42,
        'name': 'Mayank Sahoo',
        'amount': 500,
        'last_payment': '2023-08-02',
    },
    {
        'id':4,
        'uid': 100,
        'name': 'Suraj Yadav',
        'amount': 500,
        'last_payment': '2023-08-02',
    },
    {
        'id':5,
        'uid': 56,
        'name': 'Poonam Kumar',
        'amount': 500,
        'last_payment': '2023-08-02',
    },
    {
        'id':6,
        'uid': 80,
        'name': 'Rohit Kumar',
        'amount': 500,
        'last_payment': '2023-08-02',
    },
]

function get(request, response){
    response.send(data);
}

exports.get = get;