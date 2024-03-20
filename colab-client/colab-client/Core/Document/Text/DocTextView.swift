//
//  DocTextView.swift
//  colab-client
//
//  Created by Chris Griffith on 2/26/24.
//

import SwiftUI

struct DocTextView: View {
    @State var text: String
    @State var background: String
    @State var accent: String
    
    var body: some View {
        Text(text)
            .font(Font.custom("KumbhSans-Regular", size: 16))
            .foregroundStyle(.black)
            .padding(.horizontal, 5)
            .padding(.vertical, 5)
            .background(Color(background))
            .border(width: 2, edges: [.leading, .trailing], color: Color(accent))
            .onLongPressGesture(minimumDuration: 2.0) {
                // Menu stuffs
                print("Long pressed!")
            }
            
    }
}

extension View {
    func border(width: CGFloat, edges: [Edge], color: Color) -> some View {
        overlay(EdgeBorder(width: width, edges: edges).foregroundColor(color))
    }
}

struct EdgeBorder: Shape {
    var width: CGFloat
    var edges: [Edge]

    func path(in rect: CGRect) -> Path {
        edges.map { edge -> Path in
            switch edge {
            case .top: return Path(.init(x: rect.minX, y: rect.minY, width: rect.width, height: width))
            case .bottom: return Path(.init(x: rect.minX, y: rect.maxY - width, width: rect.width, height: width))
            case .leading: return Path(.init(x: rect.minX, y: rect.minY, width: width, height: rect.height))
            case .trailing: return Path(.init(x: rect.maxX - width, y: rect.minY, width: width, height: rect.height))
            }
        }.reduce(into: Path()) { $0.addPath($1) }
    }
}

#Preview {
    DocTextView(text: "fruits of work must never", background: "pink", accent: "pinkAccent")
}
