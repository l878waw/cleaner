//
//  cleanerApp.swift
//  cleaner
//
//  Created by KP on 04/02/2026.
//

import SwiftUI
import CoreData

@main
struct cleanerApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
