// Saves options (synced)
function saveOptions() {
  // get base URL
  event.preventDefault();
  var jira = document.getElementById('jira-url').value;
  var defaultOption = document.getElementById('default-option').value;
  chrome.storage.sync.set({
    jiraURL: jira,
    defaultOption: defaultOption
  }, function() {
    // Notify user
    var status = document.getElementById('status');
    status.textContent = 'Options were saved!';
    // remove after 500ms
    window.setTimeout(window.close, 500);
  });
}

// Restore the JIRA base url
function restoreOptions() {
  // fallback to empty string
  chrome.storage.sync.get({
    jiraURL: '',
    defaultOption: 'current tab'
  }, function(options) {
    // set value
    document.getElementById('jira-url').value = options.jiraURL;
    document.getElementById('default-option').value = options.defaultOption;
  });
}

// Load options on DOMContentLoad
document.addEventListener('DOMContentLoaded', restoreOptions);
// Save options when button is clicked
window.addEventListener('load', function(evt) {
  document.getElementById('options').addEventListener('submit', saveOptions);
});
