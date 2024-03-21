document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculate').addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'button_clicked' }, function (response) {
              if (response && response.score) {
                  document.getElementById('readabilityScore').textContent = response.score;
                  document.getElementById('description').textContent = response.description;
                  if (response.score >= 70) {
                    document.getElementById('description').style.color = 'green';
                    document.getElementById('readabilityScore').style.color = 'green';
                  }
                  if (response.score < 70 && response.score >= 50) {
                    document.getElementById('description').style.color = '#d49102';
                    document.getElementById('readabilityScore').style.color = '#d49102';
                  }
                  if (response.score < 50) {
                    document.getElementById('description').style.color = 'red';
                    document.getElementById('readabilityScore').style.color = 'red';
                  }
                }
            });
      });
    });
  });