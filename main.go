package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.Handle("/", fs)

	err := http.ListenAndServe(":54321", nil)
	if err != nil {
		log.Fatal(err)
	}
}