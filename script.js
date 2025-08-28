
// <!-- JavaScript -->

function submitQuiz() {
const form = document.getElementById('emailQuiz');
const userName = document.getElementById('userName').value.trim();
const answers = form.querySelectorAll('input[type="radio"]:checked');
const totalQuestions = 4;
let correctAnswers = 0;

if (!userName) {
    alert('Please enter your name before submitting!');
    return;
}

// Correct answers for each question
const correctKeys = {
    emailQuestion1: "1",
    emailQuestion2: "1",
    emailQuestion3: "1",
    emailQuestion4: "1",
};

// Validate if all questions are answered
if (answers.length < totalQuestions) {
    alert('Please answer all questions before submitting!');
    return;
}

// Compare user's answers with correct answers
answers.forEach(answer => {
    if (answer.value === correctKeys[answer.name]) correctAnswers++;
});

// Calculate score percentage
const scorePercentage = (correctAnswers / totalQuestions) * 100;

// Display the results in a pie chart
const ctx = document.getElementById('emailResultChart').getContext('2d');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
            data: [correctAnswers, totalQuestions - correctAnswers],
            backgroundColor: ['#28a745', '#dc3545'], // Green and red colors
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

// Display detailed feedback
const answersDiv = document.getElementById('answers');
answersDiv.innerHTML = `
    <h5>Your Score: ${scorePercentage.toFixed(2)}%</h5>
    <p>${correctAnswers} out of ${totalQuestions} questions answered correctly.</p>
`;

// Check if the user is eligible for a certificate
const certificateDiv = document.getElementById('certificate');
if (scorePercentage >= 80) {
    certificateDiv.innerHTML = `
        <div class="alert alert-success">
            <h4>Congratulations, ${userName}!</h4>
            <p>You scored above 80% and earned a certificate.</p>
            <a href="#" onclick="generateCertificate('${userName}', ${scorePercentage.toFixed(2)})" class="btn btn-primary">Download Certificate</a>
        </div>
    `;
} else {
    certificateDiv.innerHTML = `
        <div class="alert alert-danger">
            <h4>Sorry, ${userName}!</h4>
            <p>Your score is below 80%. Keep practicing to earn a certificate.</p>
        </div>
    `;
}
}

// Function to Generate Certificate
function generateCertificate(name, score) {
const certificateContent = `
    <div style="
        text-align: center; 
        font-family: 'Georgia', serif; 
        border: 10px solid #007bff; 
        border-radius: 15px; 
        padding: 30px; 
        max-width: 600px; 
        margin: auto; 
        background: linear-gradient(145deg, #ffffff, #f2f2f2); 
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);">
        <h1 style="font-size: 40px; color: #007bff; margin-bottom: 10px;">📧🎉Certificate of Achievement 🎉📧</h1>
        <p style="font-size: 18px; color: #555; margin-bottom: 30px;">This certificate is proudly presented to:</p>
        <h2 style="font-size: 28px; color: #000; font-weight: bold; margin-bottom: 20px;">${name}</h2>
        <p style="font-size: 16px; color: #555;">For achieving an outstanding score of:</p>
        <h3 style="font-size: 26px; color: #2196f3; margin-bottom: 30px;">${score}%</h3>
        <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
            On the <strong>Email Phishing Quiz</strong><br>
            Demonstrating exceptional knowledge of phishing awareness.
        </p>
        <p style="font-size: 14px; color: #777;">Date: ${new Date().toLocaleDateString()}</p>
        <p style="font-size: 14px; color: #777;">Verified by <strong>Phishing Awareness Initiative</strong></p>
    </div>
`;

// Open a new window for the certificate
const certificateWindow = window.open('', '_blank');
certificateWindow.document.write(certificateContent);
certificateWindow.document.close();
certificateWindow.print();
}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>