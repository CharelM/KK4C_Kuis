const db = require("../models");
const Quiz = db.quizzes;

//submitOne: memproses jawaban dari satu quiz
exports.submitOne = async (req, res) => {

    // data yang didapatkan dari inputan oleh user
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try {
        var quiz = await Quiz.findOne({
            where: {
                id: req.body.quizId
            }
        });
        //pencabangan
        if (req.body.answer == quiz.key) {
            res.status(200).json({
                "message": "benar"
            })
        } else {
            res.status(200).json({
                "message": `jawabanmu salahtd`
            })
        }
    } catch (e) {
        res.status(500).json({ message: e.message});
    }
};

//submitMany: memproses jawaban lebih dari satu quiz dengan json array
exports.submitMany = async (req, res) => {

    // data yang didapatkan dari inputan oleh user
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,

        // quiz id : [1,2],
        //answer : ["b", "c"]
    };

        try{
            let benar = 0
            let totalSoal = jobsheet.quizId.length
            //perulangan
            for (let i = 0; i < totalSoal ; i++) {
                const quiz = await  Quiz.findOne({
                    limit: 1,
                    where: {
                        id: jobsheet.quizId[i]
                    },
                    order: [ [ 'id', 'DESC']],
                });
                if(quiz.key == jobsheet.answer[i]){
                    benar = benar + 1
                }
            }
            res.status(200).json({
                message: `benar ${benar} dari ${totalSoal} soal`
            })
        } catch (e) {
            res.status(500).json({ message: e.message});
        }
};