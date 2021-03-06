package main

import (
	"encoding/json"
	"fmt"
	"github.com/akutz/sortfold"
	"log"
	"net/http"
	"time"
)

type DogsJSON struct {
	Status string              `json:"status"`
	Dogs   map[string][]string `json:"message"`
}

type JSONCache struct {
	data DogsJSON
	timestamp time.Time
}

var DogCache JSONCache

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)
	http.HandleFunc("/api/list", func(w http.ResponseWriter, r *http.Request) {
		dogs := arrayConvert(getDogsJSON())
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
	if time.Since(DogCache.timestamp) > time.Duration(5)*time.Minute {
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
		DogCache = JSONCache{record, time.Now().UTC()}
	}

	return DogCache.data
}
