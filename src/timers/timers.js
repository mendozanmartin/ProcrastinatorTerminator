document.addEventListener("DOMContentLoaded", () => {
  const domainLabels = [];
  const domainDurations = [];
  const domainImages = [];
  const domainLastAccessed = [];
  window.setInterval(() => {
    chrome.storage.local.get("browseTime", (obj) => {
      document.getElementById("browse-time").innerHTML = JSON.stringify(
        obj.browseTime
      );
    });
  }, 1000);
  chrome.storage.local.get(null, function (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].isDomain === true && key != "null") {
        const d = new Date(0);
        d.setUTCSeconds(obj[key].startTime);
        domainLabels.push(key);
        domainDurations.push(parseInt(obj[key].duration / 60000));
        domainImages.push(obj[key].image);
        domainLastAccessed.push(d);
      }
    });

    for (let i = 0; i < domainLabels.length; i++) {
      document.getElementById("table-data").innerHTML += `
        <tr>
          <td><img src="${domainImages[i]}" style="width: 30px;height:30px;"/></td>
          <td>${domainLabels[i]}</td>
          <td>${domainDurations[i]}</td>
          <td>${domainLastAccessed[i]}</td>
        </tr>`;
    }
  });
});
