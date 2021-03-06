import { Promise } from '../node_modules/es6-promise';
import { constants } from '../constants/constants';

export module RestUtil {

    const LIST_NAME = constants.listName;

    export function submit(columns, listData) {

        return new Promise((resolve, reject) => {

            columns.__metadata = { "type": `${listData}` };

            let data = JSON.stringify(columns);
            let req = new XMLHttpRequest;

            req.open('POST', `${_spPageContextInfo.webAbsoluteUrl}/_api/Web/Lists/GetByTitle('${LIST_NAME}')/Items`, true);
            req.setRequestHeader('Content-Type', 'application/json;odata=verbose');
            req.setRequestHeader('Accept', 'application/json;odata=verbose');
            req.setRequestHeader('X-RequestDigest', (<HTMLInputElement>document.getElementById('__REQUESTDIGEST')).value);

            req.onload = () => {
                console.log(req.statusText);
                if (req.status == 201) {
                    console.log(`Success: ${req.status}`);
                    resolve(req.response);
                }
                else {
                    console.log(`Fail: ${req.status}`);
                    reject(Error(req.statusText));
                }
            };

            req.onerror = () => {
                console.log(`Error: ${req.status}`);
                reject(Error("Network Error"));
            };

            req.send(data);
        });




    }

    export function getListData(data) {

        return new Promise((resolve, reject) => {

            let req = new XMLHttpRequest;

            req.open('GET', `${_spPageContextInfo.webAbsoluteUrl}/_api/Web/Lists/GetByTitle('${LIST_NAME}')?$select=${data}`, true);
            req.setRequestHeader('Accept', 'application/json;odata=verbose');

            req.onload = () => {
                console.log(req.statusText);
                if (req.status == 200) {
                    console.log(`Success: ${req.status}`);
                    let response = JSON.parse(req.response);
                    resolve(response.d[`${data}`]);
                }
                else {
                    console.log(`Fail: ${req.status}`);
                    reject(Error(req.statusText));
                }
            };
            req.onerror = () => {
                console.log(`Error: ${req.status}`);
                reject(Error("Network Error"));
            };
            req.send(null);
        });
    }

    export function getUsers(queryText) {
        return new Promise((resolve, reject) => {          
                let req = new XMLHttpRequest;

                req.open('GET', `${_spPageContextInfo.webAbsoluteUrl}/_vti_bin/listdata.svc/UserInformationList?$filter=startswith(Name,'${queryText}')`, true);
                req.setRequestHeader('Accept', 'application/json;odata=verbose');

                req.onload = () => {
                    if (req.status == 200) {
                        let response = JSON.parse(req.response);
                        //need functionality to strip out the users info into an array format
                        //reference the demo people data from office fabric code
                        resolve(response.d.results);
                    }
                    else {
                        console.log(`Fail: ${req.status}`);
                        reject(Error(req.statusText));
                    }
                };
                req.onerror = () => {
                    console.log(`Error: ${req.status}`);
                    reject(Error("Network Error"));
                };
                req.send(null);
        });
    }
}
