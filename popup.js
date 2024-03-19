document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculate').addEventListener('click', function () {
      console.log('Button was clicked');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          console.log('Button was clicked in popup');
            chrome.tabs.sendMessage(tabs[0].id, { action: 'button_clicked' }, function (response) {
                console.log('Response:', { response });
                if(response && response.score){
                    console.log('Score:', response.score);
                    document.getElementById('readabilityScore').textContent = response.score;
                    document.getElementById('gradeLevel').textContent = response.gradeLevel;
                    document.getElementById('description').textContent = response.description;
                }
            });
      });
    });
  });