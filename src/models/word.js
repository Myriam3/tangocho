module.exports = {
    getItem: (id) => {
        let data = null;

        if (Number(id) === 1) {
            data = {
                id: 1,
                lang: 'ja',
                word: '関数',
                labels: ['Programming'],
                type: 'Noun',
                sentences: ['testtestest', 'testtestest'],
                concepts: [
                    {
                        name: '関数',
                        related: [
                            {
                                id: 22,
                                word: '関数名',
                            },
                            {
                                id: 23,
                                word: '関数呼び出し',
                            },
                        ],
                    },
                ],
                translations: [
                    {
                        id: 11,
                        lang: 'en',
                        word: 'Function',
                    },
                ],
            };
        } else {
            data = {
                id: 22,
                lang: 'en',
                word: 'test',
                labels: [],
                type: 'Noun',
                sentences: [],
                concepts: [],
                translations: [],
            };
        }

        return data;
    },
};
