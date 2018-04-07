package main

import (
	"log"
	"net/http"
	"encoding/json"
	"fmt"
	"github.com/akutz/sortfold"
)

type DogsJSON struct {
	Status string              `json:"status"`
	Dogs   map[string][]string `json:"message"`
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		var dogs []string = arrayConvert(getDogsJSON())
		json.NewEncoder(w).Encode(dogs)
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func arrayConvert(record DogsJSON) []string {
	var dogs []string
	for key, val := range record.Dogs {
		dogs = append(dogs, key)
		for _, sub := range val {
			dogs = append(dogs, fmt.Sprintf("%s %s", sub, key))
		}
	}
	sortfold.Strings(dogs)
	return dogs
}

func getDogsJSON() DogsJSON {
	var record DogsJSON
	url := "https://dog.ceo/api/breeds/list/all"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal("NewRequest: ", err)
		return record
	}
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Do: ", err)
		return record
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&record); err != nil {
		log.Println(err)
	}

	return record
}
