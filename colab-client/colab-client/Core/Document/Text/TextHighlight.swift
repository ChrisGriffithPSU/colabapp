//
//  TextHighlight.swift
//  colab-client
//
//  Created by Chris Griffith on 2/26/24.
//

import Foundation

enum TextHighlight {
    case pink
    case blue
    case red
    case green
    case lightBlue
    case yellow
    
    var background: String {
        switch self {
        case .pink:
            return "pink"
        case .blue:
            return "blue"
        case .red:
            return "red"
        case .green:
            return "green"
        case .lightBlue:
            return "lightblue"
        case .yellow:
            return "yellow"
        }
    }
    
    var accent: String {
        switch self {
        case .pink:
            return "pinkAccent"
        case .blue:
            return "blueAccent"
        case .red:
            return "redAccent"
        case .green:
            return "greenAccent"
        case .lightBlue:
            return "lightblueAccent"
        case .yellow:
            return "yellow"
        }
    }
}
